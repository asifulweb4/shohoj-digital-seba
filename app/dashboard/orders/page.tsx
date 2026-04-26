'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getOrdersAction } from '@/lib/actions'
import { Clock, CheckCircle, XCircle, AlertTriangle, ArrowLeft, Receipt, ExternalLink } from 'lucide-react'

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersData = await getOrdersAction()
            setOrders(ordersData)
            setLoading(false)
        }
        fetchOrders()
    }, [])

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'completed': return { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'সম্পন্ন' };
            case 'pending': return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'অপেক্ষমাণ' };
            case 'cancelled': return { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', label: 'বাতিল' };
            default: return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100', label: status };
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6fdf9]">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f6fdf9] p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="group flex items-center gap-2 text-emerald-800 hover:text-emerald-600 mb-8 font-black text-sm transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    ড্যাশবোর্ডে ফিরে যান
                </button>

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl font-black text-[#022c22] mb-3">আমার অর্ডার সমূহ</h1>
                    <p className="text-gray-500 font-bold text-sm">আপনার সব অর্ডারের বর্তমান অবস্থা এখান থেকে দেখুন</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white p-16 rounded-[3rem] text-center shadow-2xl shadow-emerald-900/5 border border-emerald-50">
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Receipt size={32} className="text-emerald-300" />
                        </div>
                        <h2 className="text-xl font-black text-[#022c22] mb-2">কোনো অর্ডার পাওয়া যায়নি</h2>
                        <p className="text-gray-400 font-bold text-sm mb-8">আপনি এখনও কোনো সেবার জন্য আবেদন করেননি।</p>
                        <button onClick={() => router.push('/dashboard')} className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200">সেবাসমূহ দেখুন</button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order: any) => {
                            const s = getStatusStyles(order.status)
                            return (
                                <div key={order.id} className="group bg-white p-6 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 hover:border-emerald-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            <Receipt size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-[#022c22] text-lg leading-tight mb-1">{order.serviceName}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                <p className="text-gray-500 font-bold text-xs">অर्डर আইডি: #{order.id}</p>
                                                <p className="text-gray-400 font-bold text-xs">{new Date(order.createdAt).toLocaleString('bn-BD')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                                        <div className="text-right">
                                            <p className="text-emerald-700 font-black text-xl leading-none mb-1">৳ {order.price}</p>
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${s.bg} ${s.color} ${s.border} border`}>
                                                <s.icon size={12} /> {s.label}
                                            </div>
                                        </div>
                                        <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}