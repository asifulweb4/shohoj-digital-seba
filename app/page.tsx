'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { services, categories, stats } from '@/lib/services'
import { Search, ArrowRight, CheckCircle, Star, Zap, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredServices = services.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      <Navbar />

      {/* HERO */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-300 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                🇧🇩 সহজ ডিজিটাল সেবা প্ল্যাটফর্ম
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                সকল সরকারি সেবা
                <span className="block text-green-300">এক জায়গায়</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                NID, স্মার্টকার্ড, TIN, জন্ম নিবন্ধন সহ ৪২টিরও বেশি সরকারি সেবা এখন আপনার হাতের মুঠোয়।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a7a3c] font-bold rounded-xl hover:bg-green-50 transition-all shadow-lg text-lg">
                  সেবা দেখুন <ArrowRight size={20} />
                </Link>
                <Link href="/auth/login" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all border border-white/30 text-lg">
                  লগইন করুন
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 mt-8 text-sm text-green-100">
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-300" /> ১০০% নিরাপদ</span>
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-300" /> ২৪/৭ সেবা</span>
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-300" /> তাৎক্ষণিক ফলাফল</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-slide-up">
              {stats.map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[#1a7a3c]">{stat.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fffe" />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Zap className="text-yellow-500" size={32} />, title: 'দ্রুত সেবা', desc: 'মাত্র কয়েক মিনিটের মধ্যে আপনার প্রয়োজনীয় সেবা পান' },
            { icon: <Shield className="text-[#1a7a3c]" size={32} />, title: 'সম্পূর্ণ নিরাপদ', desc: 'Supabase দ্বারা সুরক্ষিত। আপনার তথ্য সম্পূর্ণ গোপনীয়' },
            { icon: <Clock className="text-blue-500" size={32} />, title: '২৪/৭ সহায়তা', desc: 'দিনরাত যেকোনো সময় আমাদের সহায়তা পাওয়া যায়' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="text-yellow-500" size={24} fill="currentColor" />
          <h2 className="text-2xl font-bold text-gray-800">জনপ্রিয় সেবাসমূহ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.filter(s => s.popular).map(s => (
            <Link key={s.id} href="/dashboard" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 service-card group">
              <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>{s.icon}</div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{s.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ALL SERVICES */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">সকল সেবাসমূহ</h2>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="সেবা খুঁজুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm w-56" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-[#1a7a3c] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a7a3c]'}`}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredServices.map(s => (
            <Link key={s.id} href="/dashboard" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 service-card group">
              <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>{s.icon}</div>
              <p className="text-xs font-medium text-gray-700 leading-tight">{s.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#145a2e] to-[#1a7a3c] my-12 mx-4 sm:mx-8 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl"></div></div>
        <div className="relative text-center text-white max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">আজই শুরু করুন</h2>
          <p className="text-green-100 text-lg mb-8">বিনামূল্যে অ্যাকাউন্ট খুলুন এবং সকল সরকারি সেবা উপভোগ করুন</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1a7a3c] font-bold rounded-xl hover:bg-green-50 transition-all shadow-lg text-lg">
            সেবাসমূহ দেখুন <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
