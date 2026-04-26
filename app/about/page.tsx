'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Shield, Users, Globe, Award, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

const values = [
  { icon: Shield, title: 'নিরাপত্তা', desc: 'আপনার সকল তথ্য আমাদের কাছে সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড থাকে।' },
  { icon: Users, title: 'গ্রাহক সেবা', desc: 'আমাদের দক্ষ টিম ২৪/৭ আপনাকে সেবা দিতে প্রস্তুত।' },
  { icon: Globe, title: 'সহজলভ্যতা', desc: 'গ্রাম বা শহর, দেশের যেকোনো প্রান্ত থেকে আমাদের সেবা গ্রহণ করা যায়।' },
  { icon: Award, title: 'নির্ভরযোগ্যতা', desc: 'বিগত কয়েক বছর ধরে আমরা লক্ষ লক্ষ গ্রাহককে সফলভাবে সেবা দিয়ে আসছি।' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6fdf9]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
          <span className="tag-gold mb-6 inline-block">আমাদের সম্পর্কে</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 glow-green">সহজ ডিজিটাল সেবা</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            আমরা বাংলাদেশের নাগরিকদের সরকারি ও ডিজিটাল সেবা প্রাপ্তি সহজতর করতে অঙ্গীকারবদ্ধ। 
            একটি স্মার্ট বাংলাদেশ বিনির্মাণে আমরা আপনার ডিজিটাল সঙ্গী।
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="/banner1.png" 
                alt="Our Mission" 
                width={600} 
                height={400}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#022c22] mb-6 section-title">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              সহজ ডিজিটাল সেবার মূল লক্ষ্য হলো জটিল সরকারি সেবাগুলোকে সাধারণ মানুষের হাতের মুঠোয় পৌঁছে দেওয়া। 
              আমরা বিশ্বাস করি যে প্রযুক্তি ব্যবহারের মাধ্যমে নাগরিক জীবন আরও সহজ ও সুন্দর করা সম্ভব।
            </p>
            <div className="space-y-4">
              {[
                'স্বচ্ছ ও দ্রুত সেবা নিশ্চিত করা',
                'দালালমুক্ত সরকারি সেবা প্রাপ্তি',
                'ডিজিটাল স্বাক্ষরতা বৃদ্ধি করা',
                'সর্বাধুনিক প্রযুক্তির ব্যবহার'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#059669]" size={20} />
                  <span className="font-bold text-[#022c22]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#022c22] section-title">আমাদের মূল স্তম্ভ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="service-card bg-[#f0fdf4] p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                  <v.icon size={28} className="text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#022c22] mb-4">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
