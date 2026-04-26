import { Fragment } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, MessageSquare, Video, MessageCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'হোম' },
  { href: '/auth/register', label: 'রেজিস্ট্রেশন' },
  { href: '/auth/login', label: 'লগইন' },
  { href: '/dashboard', label: 'ড্যাশবোর্ড' },
  { href: '/dashboard/orders', label: 'অর্ডার লিস্ট' },
]

const popularServices = [
  'NID কপি', 'স্মার্ট কার্ড', 'TIN ডাউনলোড',
  'জন্ম নিবন্ধন', 'বায়োমেট্রিক তথ্য', 'ভোটার লিস্ট',
]

const trustBadges = [
  { icon: Shield, label: '১০০% নিরাপদ', color: '#34d399' },
  { icon: Clock, label: '২৪/৭ সেবা', color: '#fbbf24' },
  { icon: Star, label: 'বিশ্বস্ত প্ল্যাটফর্ম', color: '#14b8a6' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #011a13 0%, #022c22 60%, #011a13 100%)' }}>

      {/* Green glow orb — top left */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 70%)', transform: 'translate(-40%,-40%)' }} />
      {/* Gold glow orb — bottom right */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.14) 0%, transparent 70%)', transform: 'translate(40%,40%)' }} />
      {/* Teal orb — right center */}
      <div className="absolute top-1/2 right-0 w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)', transform: 'translate(30%,-50%)' }} />

      {/* ── Trust badges ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-10 sm:gap-20">
          {trustBadges.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm font-bold" style={{ color }}>
              <Icon size={16} strokeWidth={2.5} style={{ color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #064e3b, #059669)', boxShadow: '0 4px 20px rgba(5,150,105,0.4)' }}>
                <span className="text-white font-black text-2xl">স</span>
              </div>
              <div>
                <div className="text-white font-black text-xl leading-tight">সহজ ডিজিটাল সেবা</div>
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#34d399' }}> Shohoj Digital Sheba</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
              বাংলাদেশের সকল সরকারি সেবা এখন এক জায়গায়। দ্রুত, সহজ এবং সম্পূর্ণ নির্ভরযোগ্য।
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { href: 'https://facebook.com', hoverBg: '#2563eb', Icon: MessageSquare },
                { href: 'https://youtube.com', hoverBg: '#dc2626', Icon: Video },
                { href: 'https://wa.me/message/JJZIWPGL7JTXB1', hoverBg: '#16a34a', Icon: MessageCircle },
              ].map(({ href, hoverBg, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 group"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = hoverBg
                      ; (e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                      ; (e.currentTarget as HTMLElement).style.color = '#9ca3af'
                  }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full inline-block"
                style={{ background: 'linear-gradient(90deg,#059669,#d97706)' }} />
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="flex items-center gap-2 text-sm font-medium transition-colors group"
                    style={{ color: '#9ca3af' }}>
                    <ArrowRight size={12} style={{ color: '#059669' }}
                      className="group-hover:translate-x-1 transition-transform" />
                    <span className="group-hover:text-emerald-300 transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular services */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full inline-block"
                style={{ background: 'linear-gradient(90deg,#059669,#d97706)' }} />
              জনপ্রিয় সেবা
            </h3>
            <ul className="space-y-3">
              {popularServices.map(s => (
                <li key={s} className="flex items-center gap-2 text-sm font-medium cursor-pointer group"
                  style={{ color: '#9ca3af' }}>
                  <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-colors group-hover:bg-emerald-700/50"
                    style={{ background: 'rgba(6,79,59,0.35)', color: '#34d399' }}>✓</span>
                  <span className="group-hover:text-emerald-300 transition-colors">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full inline-block"
                style={{ background: 'linear-gradient(90deg,#059669,#d97706)' }} />
              যোগাযোগ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(6,79,59,0.3)', border: '1px solid rgba(5,150,105,0.25)' }}>
                  <MapPin size={14} style={{ color: '#34d399' }} />
                </div>
                <span className="text-sm" style={{ color: '#9ca3af' }}>ঢাকা, বাংলাদেশ</span>
              </li>
              <li>
                <Link href="https://wa.me/message/JJZIWPGL7JTXB1" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-bold text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#25D366' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp এ মেসেজ দিন
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(6,79,59,0.3)', border: '1px solid rgba(5,150,105,0.25)' }}>
                  <Mail size={14} style={{ color: '#34d399' }} />
                </div>
                <a href="mailto:support@digitalshebabd.com"
                  className="text-sm font-medium transition-colors hover:text-emerald-300 break-all"
                  style={{ color: '#9ca3af' }}>
                  support@digitalshebabd.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left" style={{ color: '#6b7280' }}>
            © ২০২৬{' '}
            <span className="font-bold" style={{ color: '#34d399' }}>সহজ ডিজিটাল সেবা</span>
            । সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-5 text-xs font-medium" style={{ color: '#6b7280' }}>
            {[
              { href: '/privacy', label: 'গোপনীয়তা নীতি' },
              { href: '/terms', label: 'শর্তাবলী' },
              { href: '/contact', label: 'যোগাযোগ' },
            ].map((item, i) => (
              <Fragment key={item.href}>
                {i > 0 && <span key={`sep-${i}`} style={{ color: '#374151' }}>|</span>}
                <Link href={item.href}
                  className="hover:text-emerald-400 transition-colors">{item.label}</Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
