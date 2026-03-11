-- ══════════════════════════════════════════════════
-- AUTO-APPROVE RECHARGE SQL
-- Supabase SQL Editor এ এই SQL টা Run করুন
-- ══════════════════════════════════════════════════

-- পুরনো ফাংশন থাকলে মুছুন
DROP FUNCTION IF EXISTS public.auto_approve_recharge(DECIMAL, TEXT, TEXT, TEXT, TEXT);

-- নতুন ফাংশন: রিচার্জ সাথে সাথে অ্যাপ্রভ ও ব্যালেন্স যোগ হবে
CREATE OR REPLACE FUNCTION public.auto_approve_recharge(
  p_amount    DECIMAL,
  p_trx_id   TEXT,
  p_method   TEXT,
  p_description TEXT DEFAULT NULL,
  p_account_type TEXT DEFAULT 'Personal'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- লগিন ইউজার আইডি নাও
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'অনুমোদিত নয় - আগে লগিন করুন');
  END IF;

  -- পরিমাণ বৈধ কিনা চেক করো
  IF p_amount <= 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'টাকার পরিমাণ সঠিক নয়');
  END IF;

  -- transactions টেবিলে approved হিসেবে ঢোকাও
  INSERT INTO public.transactions (
    user_id, type, amount, trx_id, method, status, description
  ) VALUES (
    v_user_id,
    'recharge',
    p_amount,
    p_trx_id,
    p_method,
    'approved',
    COALESCE(p_description, 'Auto-approved recharge: ' || p_account_type)
  );

  -- সাথে সাথে প্রোফাইলে ব্যালেন্স যোগ করো
  UPDATE public.profiles
  SET balance = balance + p_amount
  WHERE id = v_user_id;

  RETURN jsonb_build_object('success', true, 'message', 'ব্যালেন্স সফলভাবে যোগ হয়েছে!');

EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object('success', false, 'message', 'এই TrxID আগে ব্যবহার হয়েছে। অন্য TrxID দিন।');
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;

-- ফাংশনটি সব authenticated ইউজার ব্যবহার করতে পারবে
GRANT EXECUTE ON FUNCTION public.auto_approve_recharge(DECIMAL, TEXT, TEXT, TEXT, TEXT) TO authenticated;
