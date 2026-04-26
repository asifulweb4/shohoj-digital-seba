'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
    getAdminStats, 
    approveTransactionAction, 
    rejectTransactionAction, 
    updateOrderAction,
    logoutAction,
    getProfile
} from '@/lib/actions'
import { LayoutDashboard, Users, CreditCard, ShoppingBag, LogOut, Check, X, Edit2, ShieldCheck, Search } from 'lucide-react'

export default function AdminPage() {
    const router = useRouter()
    const [tab, setTab] = useState<'transactions' | 'orders' | 'users'>('transactions')
    const [transactions, setTransactions] = useState<any[]>([])
    const [orders, setOrders] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [editOrder, setEditOrder] = useState<any>(null)
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const checkAdmin = async () => {
            const profile = await getProfile()
            if (!profile || profile.role !== 'admin') {
                router.push('/dashboard')
                return
            }
            setLoading(false)
            loadAll()
        }
        checkAdmin()
    }, [router])

    async function loadAll() {
        const data = await getAdminStats()
        if (data) {
            setTransactions(data.transactions)
            setOrders(data.orders)
            setUsers(data.users)
        }
    }

    async function approveTransaction(txn: any) {
        if(!confirm('আপনি কি এই পেমেন্টটি অ্যাপ্রুভ করতে চান?')) return
        setSaving(true)
        const res = await approveTransactionAction(txn.id)
        setSaving(false)
        if (!res.success) { showMsg('❌ সমস্যা হয়েছে।') } 
        else { showMsg('✅ Balance যোগ হয়েছে!'); loadAll() }
    }

    async function rejectTransaction(id: number) {
        if(!confirm('আপনি কি এই ট্রানজেকশনটি বাতিল করতে চান?')) return
        setSaving(true)
        const res = await rejectTransactionAction(id)
        setSaving(false)
        if (res.success) { showMsg('❌ Transaction বাতিল করা হয়েছে।'); loadAll() }
    }

    async function updateOrder(e: React.FormEvent) {
        e.preventDefault()
        if (!editOrder) return
        setSaving(true)
        const res = await updateOrderAction(editOrder.id, editOrder.status, editOrder.notes || '')
        setSaving(false)
        if (res.success) {
            setEditOrder(null)
            showMsg('✅ Order আপডেট হয়েছে!')
            loadAll()
        }
    }

    async function handleLogout() {
        await logoutAction()
        router.push('/auth/login')
    }

    function showMsg(text: string) {
        setMsg(text)
        setTimeout(() => setMsg(''), 3000)
    }

    const stats = {
        pendingTxn: transactions.filter((t: any) => t.status === 'pending').length,
        totalTxn: transactions.length,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length,
        totalUsers: users.length,
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6fdf9]">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#f6fdf9]">
            {msg && (
                <div className="fixed bottom-6 right-6 z-[1000] bg-emerald-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
                    {msg}
                </div>
            )}

            <div className="flex flex-col md:flex-row min-h-screen">
                <aside className="w-full md:w-64 bg-[#022c22] text-white p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">🇧🇩</div>
                        <div>
                            <p className="font-black text-sm leading-none">অ্যাডমিন প্যানেল</p>
                            <p className="text-[10px] font-bold text-emerald-400 mt-1 uppercase tracking-widest">Admin Control</p>
                        </div>
                    </div>

                    <nav className="space-y-2 flex-1">
                        <AdminNavLink active={tab === 'transactions'} onClick={() => setTab('transactions')} icon={CreditCard} label="পেমেন্ট রিকোয়েস্ট" count={stats.pendingTxn} />
                        <AdminNavLink active={tab === 'orders'} onClick={() => setTab('orders')} icon={ShoppingBag} label="অর্ডার সমূহ" count={stats.pendingOrders} />
                        <AdminNavLink active={tab === 'users'} onClick={() => setTab('users')} icon={Users} label="ইউজার লিস্ট" />
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
                        <button onClick={() => router.push('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold text-emerald-400">
                            <LayoutDashboard size={18} /> ড্যাশবোর্ড
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-all text-sm font-bold text-rose-400">
                            <LogOut size={18} /> লগআউট
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard label="পেন্ডিং পেমেন্ট" value={stats.pendingTxn} color="amber" />
                        <StatCard label="পেন্ডিং অর্ডার" value={stats.pendingOrders} color="emerald" />
                        <StatCard label="মোট ট্রানজেকশন" value={stats.totalTxn} color="blue" />
                        <StatCard label="মোট ইউজার" value={stats.totalUsers} color="gray" />
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
                        <div className="p-6 border-b border-emerald-50 bg-emerald-50/30 flex items-center justify-between">
                            <h2 className="text-xl font-black text-[#022c22]">
                                {tab === 'transactions' ? '💳 পেমেন্ট রিকোয়েস্ট' : tab === 'orders' ? '📋 অর্ডার সমূহ' : '👥 ইউজার লিস্ট'}
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            {tab === 'transactions' && (
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">ইউজার</th>
                                            <th className="px-6 py-4">পরিমাণ</th>
                                            <th className="px-6 py-4">মেথড / TrxID</th>
                                            <th className="px-6 py-4">স্ট্যাটাস</th>
                                            <th className="px-6 py-4">একশন</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {transactions.map((t: any) => (
                                            <tr key={t.id} className="hover:bg-emerald-50/30 transition-all">
                                                <td className="px-6 py-4 font-bold text-sm text-gray-700">{t.userId}</td>
                                                <td className="px-6 py-4 font-black text-emerald-700">৳{t.amount}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-bold text-gray-800">{t.method}</div>
                                                    <div className="text-[10px] font-mono text-gray-400">{t.trxId}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${t.status === 'pending' ? 'bg-amber-100 text-amber-700' : t.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {t.status === 'pending' && (
                                                        <div className="flex gap-2">
                                                            <button onClick={() => approveTransaction(t)} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"><Check size={16} /></button>
                                                            <button onClick={() => rejectTransaction(t.id)} className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"><X size={16} /></button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {tab === 'orders' && (
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">সার্ভিস</th>
                                            <th className="px-6 py-4">ইনপুট ডেটা</th>
                                            <th className="px-6 py-4">মূল্য</th>
                                            <th className="px-6 py-4">স্ট্যাটাস</th>
                                            <th className="px-6 py-4">একশন</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((o: any) => (
                                            <tr key={o.id} className="hover:bg-emerald-50/30 transition-all">
                                                <td className="px-6 py-4 font-bold text-sm text-gray-800">{o.serviceName}</td>
                                                <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">{o.inputData}</td>
                                                <td className="px-6 py-4 font-black text-emerald-700">৳{o.price}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${o.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : o.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => setEditOrder({ ...o })} className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"><Edit2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {tab === 'users' && (
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">নাম</th>
                                            <th className="px-6 py-4">ফোন</th>
                                            <th className="px-6 py-4">ব্যালেন্স</th>
                                            <th className="px-6 py-4">রোল</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map((u: any) => (
                                            <tr key={u.id} className="hover:bg-emerald-50/30 transition-all">
                                                <td className="px-6 py-4 font-bold text-sm text-gray-800">{u.fullName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{u.phone}</td>
                                                <td className="px-6 py-4 font-black text-emerald-700">৳{u.balance}</td>
                                                <td className="px-6 py-4 text-xs font-bold uppercase">{u.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {editOrder && (
                <div className="fixed inset-0 bg-[#022c22]/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-black text-[#022c22] mb-6">অর্ডার আপডেট করুন</h3>
                        <form onSubmit={updateOrder} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">বর্তমান স্ট্যাটাস</label>
                                <select value={editOrder.status} onChange={e => setEditOrder({ ...editOrder, status: e.target.value })} className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-emerald-50 outline-none focus:border-emerald-500 font-bold text-sm transition-all">
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">নোট / ডেলিভারি তথ্য</label>
                                <textarea rows={4} value={editOrder.notes || ''} onChange={e => setEditOrder({ ...editOrder, notes: e.target.value })} className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-emerald-50 outline-none focus:border-emerald-500 font-bold text-sm transition-all resize-none" placeholder="লিংক বা তথ্য দিন..." />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setEditOrder(null)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm">বাতিল</button>
                                <button type="submit" disabled={saving} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-200">আপডেট করুন</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

function AdminNavLink({ active, icon: Icon, label, onClick, count }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}>
            <Icon size={18} />
            {label}
            {count > 0 && <span className="ml-auto bg-amber-500 text-[#022c22] text-[10px] font-black px-2 py-0.5 rounded-full">{count}</span>}
        </button>
    )
}

function StatCard({ label, value, color }: any) {
    const colors: any = {
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        amber: 'bg-amber-50 text-amber-700 border-amber-100',
        blue: 'bg-blue-50 text-blue-700 border-blue-100',
        gray: 'bg-gray-50 text-gray-700 border-gray-100'
    }
    return (
        <div className={`p-6 rounded-3xl border-2 shadow-sm ${colors[color]}`}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{label}</p>
            <p className="text-3xl font-black">{value}</p>
        </div>
    )
}