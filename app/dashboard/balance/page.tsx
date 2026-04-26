'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, CheckCircle, Smartphone, Hash, Wallet, Zap, ShieldCheck } from 'lucide-react'
import { addBalanceAction } from '@/lib/actions'

export default function BalancePage() {
    const [depositAmount, setDepositAmount] = useState('')
    const [trxId, setTrxId] = useState('')
    const [senderNumber, setSenderNumber] = useState('')
    const [method, setMethod] = useState('bKash')
    const [accountType, setAccountType] = useState('Personal')
    const [submitting, setSubmitting] = useState(false)
    const [copied, setCopied] = useState<string | null>(null)
    const router = useRouter()

    const paymentNumbers = {
        bKash: '01333378924', // updated with site number
        Nagad: ''
    }

    const handleCopy = (num: string, type: string) => {
        navigator.clipboard.writeText(num)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
    }

    const handleAddBalance = async () => {
        if (!depositAmount || !trxId || !senderNumber) return alert("সবগুলো তথ্য সঠিকভাবে পূরণ করুন")
        if (Number(depositAmount) < (accountType === 'Personal' ? 10 : 100)) { // Reduced for testing
            return alert(`${accountType === 'Personal' ? 10 : 100} টাকার নিচে রিচার্জ করা সম্ভব নয়`)
        }

        setSubmitting(true)

        const res = await addBalanceAction(
            Number(depositAmount),
            trxId.trim().toUpperCase(),
            method,
            `Recharge: ${accountType}, Sender: ${senderNumber}`
        )

        setSubmitting(false)

        if (!res.success) {
            alert(res.message || "এই TrxID টি আগে ব্যবহার হয়েছে অথবা ভুল!")
        } else {
            alert("✅ পেমেন্ট রিকোয়েস্ট সাবমিট হয়েছে! এডমিন ভেরিফাই করার পর আপনার ব্যালেন্স যোগ হবে।")
            setTrxId('')
            setDepositAmount('')
            setSenderNumber('')
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-[#f6fdf9] p-4 sm:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className="group flex items-center gap-2 text-emerald-800 hover:text-emerald-600 mb-8 font-black text-sm transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    ড্যাশবোর্ডে ফিরে যান
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
                        <Wallet size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-[#022c22] mb-3">ব্যালেন্স রিচার্জ করুন</h1>
                    <p className="text-gray-500 font-bold text-sm">আপনার অ্যাকাউন্টে ব্যালেন্স যোগ করতে নিচের তথ্যগুলো দিন</p>
                </div>

                <div className="bg-white rounded-[3rem] p-6 sm:p-10 shadow-2xl shadow-emerald-900/5 border border-emerald-50">

                    {/* Method Tabs */}
                    <div className="flex bg-emerald-50/50 p-1.5 rounded-3xl mb-8 border border-emerald-100">
                        {['bKash', 'Nagad'].map(m => (
                            <button
                                key={m}
                                onClick={() => setMethod(m)}
                                className={`flex-1 py-4 rounded-2xl font-black transition-all text-sm ${method === m ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'text-emerald-800 hover:bg-emerald-100/50'}`}
                            >
                                {m} {m === 'bKash' ? 'বিকাশ' : 'নগদ'}
                            </button>
                        ))}
                    </div>

                    {/* Notice Box */}
                    <div className="bg-emerald-900 text-white p-6 rounded-3xl mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Zap className="text-amber-400" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-emerald-300 uppercase tracking-widest mb-1">প্রক্রিয়া</p>
                                <p className="text-sm font-bold leading-relaxed">
                                    নিচের নম্বরে <span className="text-amber-400">Send Money</span> করার পর Transaction ID (TrxID) দিয়ে সাবমিট করুন।
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Number Card */}
                    <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-3xl mb-10 text-center relative group">
                        <p className="text-emerald-700 text-xs font-black uppercase tracking-widest mb-3">{method} Personal Number</p>
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-3xl sm:text-4xl font-black text-emerald-900 tracking-tighter">
                                {method === 'bKash' ? paymentNumbers.bKash : paymentNumbers.Nagad}
                            </span>
                            <button
                                onClick={() => handleCopy(method === 'bKash' ? paymentNumbers.bKash : paymentNumbers.Nagad, method)}
                                className="flex items-center gap-2 bg-white border-2 border-emerald-100 hover:border-emerald-500 px-6 py-2.5 rounded-2xl text-sm font-black text-emerald-700 transition-all shadow-sm"
                            >
                                {copied === method ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Number</>}
                            </button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">প্রেরকের নম্বর (যেখান থেকে টাকা পাঠিয়েছেন)</label>
                                <div className="relative">
                                    <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/50" />
                                    <input
                                        type="tel"
                                        placeholder="01XXXXXXXXX"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald-50 outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-all font-bold text-sm"
                                        value={senderNumber}
                                        onChange={e => setSenderNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">টাকার পরিমাণ (৳)</label>
                                <div className="relative">
                                    <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/50" />
                                    <input
                                        type="number"
                                        placeholder="মিনিটাম ১০ টাকা"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald-50 outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-all font-bold text-sm"
                                        value={depositAmount}
                                        onChange={e => setDepositAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Transaction ID (TrxID)</label>
                            <div className="relative">
                                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/50" />
                                <input
                                    type="text"
                                    placeholder="বিকাশ/নগদ এর মেসেজ থেকে TrxID দিন"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald-50 outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-all font-bold text-sm uppercase"
                                    value={trxId}
                                    onChange={e => setTrxId(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleAddBalance}
                                disabled={submitting}
                                className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {submitting ? (
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <><ShieldCheck size={24} /> পেমেন্ট সাবমিট করুন</>
                                )}
                            </button>
                            <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-[0.2em]">নিরাপদ ও এনক্রিপ্টেড পেমেন্ট গেটওয়ে</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}