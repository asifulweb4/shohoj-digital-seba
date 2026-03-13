import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Youtube, MessageCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'হোম' },
  { href: '/auth/register', label: 'রেজিস্ট্রেশন' },
  { href: '/auth/login', label: 'লগইন' },
  { href: '/dashboard', label: 'ড্যাশবোর্ড' },
  { href: '/dashboard/orders', label: 'অর্ডার লিস্ট' },
]

const popularServices = [
  'NID কপি',
  'স্মার্ট কার্ড',
  'TIN ডাউনলোড',
  'জন্ম নিবন্ধন',
  'বায়োমেট্রিক তথ্য',
  'ভোটার লিস্ট',
]

const trustBadges = [
  { icon: Shield, label: '১০০% নিরাপদ' },
  { icon: Clock, label: '২৪/৭ সেবা' },
  { icon: Star, label: 'বিশ্বস্ত প্ল্যাটফর্ম' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f0329]">
      {/* gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-violet-700/20 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-700/15 blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* ── top strip: trust badges ── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-violet-300 text-sm font-semibold">
              <Icon size={16} className="text-violet-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-[0_4px_20px_rgba(124,58,237,0.5)]">
                <span className="text-white font-black text-xl">স</span>
              </div>
              <div>
                <div className="text-white font-black text-lg leading-tight">সহজ ডিজিটাল সেবা</div>
                <div className="text-violet-400 text-[11px] font-medium tracking-wide">Shohoj Digital Sheba</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              বাংলাদেশের সকল সরকারি সেবা এখন এক জায়গায়। দ্রুত, সহজ এবং সম্পূর্ণ নির্ভরযোগ্য।
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                <Youtube size={17} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-violet-500 rounded-full inline-block" />
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-gray-400 hover:text-violet-300 transition-colors text-sm group"
                  >
                    <ArrowRight size={13} className="text-violet-600 group-hover:translate-x-1 transition-transform" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular services */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-violet-500 rounded-full inline-block" />
              জনপ্রিয় সেবা
            </h3>
            <ul className="space-y-3">
              {popularServices.map(s => (
                <li key={s} className="flex items-center gap-2 text-gray-400 text-sm hover:text-violet-300 transition-colors cursor-pointer group">
                  <span className="w-5 h-5 rounded-md bg-violet-900/60 flex items-center justify-center text-violet-400 text-[10px] font-black group-hover:bg-violet-700/60 transition-colors flex-shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-violet-500 rounded-full inline-block" />
              যোগাযোগ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-900/50 border border-violet-700/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-violet-400" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-900/50 border border-violet-700/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-violet-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:" className="text-gray-300 text-sm hover:text-violet-300 transition-colors font-medium">

                  </a>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                  >
                    <MessageCircle size={11} /> WhatsApp-এ মেসেজ দিন
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-900/50 border border-violet-700/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-violet-400" />
                </div>
                <a href="mailto:support@digitalshebabd.com" className="text-gray-400 text-sm hover:text-violet-300 transition-colors break-all leading-relaxed">
                  support@digitalshebabd.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © ২০২৬ <span className="text-violet-400 font-semibold">সহজ ডিজিটাল সেবা</span>। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-violet-300 transition-colors">গোপনীয়তা নীতি</Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="hover:text-violet-300 transition-colors">শর্তাবলী</Link>
            <span className="text-gray-700">|</span>
            <Link href="/contact" className="hover:text-violet-300 transition-colors">যোগাযোগ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
