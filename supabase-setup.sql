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
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  amount DECIMAL(10,2) DEFAULT 0,
  input_data JSONB,
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
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৪. Row Level Security চালু করুন
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ৫. Policies - user শুধু নিজের data দেখতে পারবে
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

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

CREATE TRIGGER profiles_updated_at
-- ৯. সিকিউরিটি ফিক্স: ব্যালেন্স কাটানোর জন্য RPC ফাংশন
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
  
  -- ইউজার লগইন করা আছে কিনা চেক
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Unauthorized');
  END IF;

  -- বর্তমান ব্যালেন্স চেক
  SELECT balance INTO v_current_balance FROM public.profiles WHERE id = v_user_id FOR UPDATE;

  IF v_current_balance < p_price THEN
    RETURN jsonb_build_object('success', false, 'message', 'Insufficient balance');
  END IF;

  -- ১. অর্ডার ইনসার্ট করা
  INSERT INTO public.orders (user_id, service_id, service_name, amount, input_data, status)
  VALUES (v_user_id, p_service_id, p_service_name, p_price, jsonb_build_object('input', p_input_data), 'pending');

  -- ২. ব্যালেন্স আপডেট করা
  UPDATE public.profiles 
  SET balance = balance - p_price 
  WHERE id = v_user_id;

  -- ৩. ট্রানজেকশন রেকর্ড রাখা
  INSERT INTO public.transactions (user_id, type, amount, description)
  VALUES (v_user_id, 'deduct', p_price, 'Order: ' || p_service_name);

  RETURN jsonb_build_object('success', true, 'message', 'Order placed successfully');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
-- ১০. লগইন ফিক্স: ফোন টু ইমেইল লুকআপ (RLS এর জন্য প্রয়োজন)
CREATE OR REPLACE FUNCTION public.get_email_by_phone(p_phone TEXT)
RETURNS TABLE (email TEXT) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT p.email 
  FROM public.profiles p
  WHERE p.phone = p_phone
  LIMIT 1;
END;
$$;
