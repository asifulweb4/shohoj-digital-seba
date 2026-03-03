// app/dashboard/balance/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet, ArrowLeft } from 'lucide-react' // ArrowLeft আইকন যোগ করা হলো
import { supabase } from '@/lib/supabase'

export default function BalancePage() {
    const [depositAmount, setDepositAmount] = useState('')
    const [trxId, setTrxId] = useState('')
    const [method, setMethod] = useState('bKash')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const handleAddBalance = async () => {
        if (!depositAmount || !trxId) return alert("টাকার পরিমাণ এবং TrxID দিন")
        setSubmitting(true)

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) { alert("লগইন করুন"); return }

        const { error } = await supabase.from('transactions').insert([
            {
                user_id: session.user.id,
                amount: Number(depositAmount),
                trx_id: trxId,
                method: method,
                status: 'pending'
            }
        ])

        setSubmitting(false)
        if (error) {
            alert("এই TrxID টি আগে ব্যবহার হয়েছে অথবা ভুল!")
        } else {
            alert("রিকোয়েস্ট পাঠানো হয়েছে! অ্যাডমিন চেক করে ব্যালেন্স যোগ করে দিবে।")
            setTrxId('')
            setDepositAmount('')
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-lg">
                {/* --- ড্যাশবোর্ডে ফিরে যাওয়ার বাটন --- */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-4 text-sm font-bold"
                >
                    <ArrowLeft size={16} /> ড্যাশবোর্ডে ফিরে যান
                </button>
                {/* --------------------------------- */}

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Wallet className="text-green-600" /> ব্যালেন্স রিচার্জ</h3>

                <div className="bg-green-50 p-4 rounded-2xl mb-4 border border-green-100">
                    <p className="text-xs text-green-800 font-bold mb-1 uppercase tracking-wider">বিকাশ/নগদ (পার্সোনাল)</p>
                    <p className="text-lg font-black text-green-700 tracking-widest">017XXXXXXXX</p>
                    <p className="text-[10px] text-green-600 mt-1">সেন্ড মানি করার পর ট্রানজেকশন আইডি দিন</p>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        {['bKash', 'Nagad'].map(m => (
                            <button key={m} onClick={() => setMethod(m)} className={`flex-1 py-2 rounded-xl border-2 text-sm font-bold transition-all ${method === m ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}>{m}</button>
                        ))}
                    </div>
                    <input type="number" placeholder="টাকার পরিমাণ" className="w-full p-3.5 bg-gray-50 border rounded-2xl outline-none focus:ring-2 ring-green-500" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
                    <input type="text" placeholder="Transaction ID (TrxID)" className="w-full p-3.5 bg-gray-50 border rounded-2xl outline-none focus:ring-2 ring-green-500" value={trxId} onChange={e => setTrxId(e.target.value)} />

                    <button onClick={handleAddBalance} disabled={submitting} className="w-full py-3.5 bg-[#1a7a3c] text-white rounded-2xl font-bold shadow-lg">
                        {submitting ? 'প্রসেসিং...' : 'সাবমিট করুন'}
                    </button>
                </div>
            </div>
        </div>
    )
}