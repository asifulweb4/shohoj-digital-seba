-- ডিজিটাল শেবা বিডি - Supabase Database Setup
-- Supabase SQL Editor এ এই পুরো SQL টা copy করে Run করুন

-- ১. Users profile table (Supabase auth এর সাথে linked)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone Text UNIQUE NOT NULL,
  email TEXT UNIQUE,
  nid TEXT,
  balance DECIMAL(10,2) DEFAULT 0,
  role TEXT DEFAULT 'client', -- Added role column
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ২. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  order_number TEXT, -- Added order_number
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  amount DECIMAL(10,2) DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0, -- Added price to match frontend
  notes TEXT, -- Added notes for admin
  input_data JSONB, -- Changed back to JSONB for flexibility
  result_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৩. Balance transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('recharge', 'deduct', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  trx_id TEXT UNIQUE,
  method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deduct', 'refund')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৪. Approve Transaction RPC function (admin will call this)
DROP FUNCTION IF EXISTS public.approve_transaction(UUID);
CREATE OR REPLACE FUNCTION public.approve_transaction(
  p_transaction_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_amount DECIMAL;
  v_status TEXT;
BEGIN
  -- ট্রানজেকশন ডেটা লোড করা
  SELECT user_id, amount, status INTO v_user_id, v_amount, v_status 
  FROM public.transactions 
  WHERE id = p_transaction_id FOR UPDATE;

  -- চেক: ট্রানজেকশন পেন্ডিং আছে কিনা
  IF v_status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Transaction is no longer pending');
  END IF;

  -- ১. ইউজারের ব্যালেন্স যোগ করা
  UPDATE public.profiles 
  SET balance = balance + v_amount 
  WHERE id = v_user_id;

  -- ২. ট্রানজেকশন স্ট্যাটাস আপডেট করা
  UPDATE public.transactions 
  SET status = 'approved' 
  WHERE id = p_transaction_id;

  RETURN jsonb_build_object('success', true, 'message', 'Transaction approved and balance added');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;

-- ৫. Row Level Security চালু করুন
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ৫. Policies - Row Level Security (RLS)
-- "Infinite Recursion" ফিক্স করার জন্য সব পুরনো পলিসি পরিষ্কার করা
DO $$ 
DECLARE 
    pol RECORD;
BEGIN 
    FOR pol IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('profiles', 'orders', 'transactions') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- ৫.১ এডমিন চেক করার জন্য নিরাপদ ফাংশন (এটি recursion রোধ করবে)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Profiles view" ON public.profiles FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "Profiles update" ON public.profiles FOR UPDATE USING (auth.uid() = id OR is_admin());

-- Orders Policies
CREATE POLICY "Orders view" ON public.orders FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Orders insert" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Orders update" ON public.orders FOR UPDATE USING (is_admin());

-- Transactions Policies
CREATE POLICY "Transactions view" ON public.transactions FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Transactions insert" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Transactions update" ON public.transactions FOR UPDATE USING (is_admin());

-- ৬. Auto profile তৈরি হবে registration এর সময়
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, nid, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'ব্যবহারকারী'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    NEW.raw_user_meta_data->>'nid',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ৭. Updated_at auto update
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ৯. সিকিউরিটি ফিক্স: ব্যালেন্স কাটানোর জন্য RPC ফাংশন
DROP FUNCTION IF EXISTS public.place_order(TEXT, TEXT, DECIMAL, TEXT);
CREATE OR REPLACE FUNCTION public.place_order(
  p_service_id TEXT,
  p_service_name TEXT,
  p_price DECIMAL,
  p_input_data TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_current_balance DECIMAL;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN jsonb_build_object('success', false, 'message', 'Unauthorized'); END IF;

  SELECT balance INTO v_current_balance FROM public.profiles WHERE id = v_user_id FOR UPDATE;
  IF v_current_balance < p_price THEN RETURN jsonb_build_object('success', false, 'message', 'Insufficient balance'); END IF;

  INSERT INTO public.orders (user_id, service_id, service_name, amount, price, input_data, status)
  VALUES (v_user_id, p_service_id, p_service_name, p_price, p_price, jsonb_build_object('input', p_input_data), 'pending');

  UPDATE public.profiles SET balance = balance - p_price WHERE id = v_user_id;

  INSERT INTO public.transactions (user_id, type, amount, description)
  VALUES (v_user_id, 'deduct', p_price, 'Order: ' || p_service_name);

  RETURN jsonb_build_object('success', true, 'message', 'Order placed successfully');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;

-- ১০. লগইন ফিক্স: ফোন টু ইমেইল লুকআপ (RLS এর জন্য প্রয়োজন)
DROP FUNCTION IF EXISTS public.get_email_by_phone(TEXT);
CREATE OR REPLACE FUNCTION public.get_email_by_phone(p_phone TEXT)
RETURNS TABLE (email TEXT) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT p.email FROM public.profiles p WHERE p.phone = p_phone LIMIT 1;
END;
$$;

-- ১১. ডাটাবেজ আপডেট (কলাম যোগ করা)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_number TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS method TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS trx_id TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS description TEXT;
