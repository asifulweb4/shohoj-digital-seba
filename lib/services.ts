export interface Service {
  id: string
  title: string
  titleEn: string
  description: string
  icon: string
  color: string
  category: string
  price: number // নতুন দামের ফিল্ড
  popular?: boolean
}

export const services: Service[] = [
  // --- আপনার দেওয়া নতুন সার্ভিসগুলো (দামের তালিকা অনুযায়ী) ---
  { id: 'number-location', title: 'নম্বর টু লোকেশন', titleEn: 'Number to Location', description: 'মোবাইল নম্বর দিয়ে লোকেশন ট্র্যাকিং', icon: '📍', color: 'bg-green-500', category: 'location', price: 170, popular: true },
  { id: 'server-copy', title: 'সার্ভার কপি', titleEn: 'Server Copy', description: 'NID কার্ডের তথ্য যাচাই (সার্ভার কপি)', icon: '📋', color: 'bg-blue-400', category: 'nid', price: 18, popular: true },
  { id: 'sign-copy', title: 'সাইন কপি', titleEn: 'Sign Copy', description: 'NID কার্ডের সাইন কপি সংগ্রহ', icon: '🖋️', color: 'bg-blue-500', category: 'nid', price: 18 },
  { id: 'nid-pdf', title: 'NID কার্ড PDF', titleEn: 'NID Card PDF', description: 'অরিজিনাল জাতীয় পরিচয়পত্রের PDF', icon: '🪪', color: 'bg-indigo-600', category: 'nid', price: 33, popular: true },
  { id: 'form-sign-copy', title: 'ফরম নাম্বার টু সাইন কপি', titleEn: 'Form to Sign Copy', description: 'ফরম নাম্বার দিয়ে সাইন কপি সংগ্রহ', icon: '📝', color: 'bg-indigo-500', category: 'nid', price: 23 },
  { id: 'official-server-copy', title: 'অফিসিয়াল সার্ভার কপি', titleEn: 'Official Server Copy', description: 'সরকারি অফিসিয়াল সার্ভার কপি', icon: '🏛️', color: 'bg-blue-800', category: 'nid', price: 59 },
  { id: 'tin-certificate', title: 'টিন সার্টিফিকেট', titleEn: 'TIN Certificate', description: 'নতুন বা পুরাতন টিন সার্টিফিকেট', icon: '📄', color: 'bg-orange-600', category: 'tax', price: 59 },
  { id: 'sim-biometric', title: 'সকল সিম বায়োমেট্রিক', titleEn: 'SIM Biometric', description: 'বায়োমেট্রিক দিয়ে সিম তথ্য যাচাই', icon: '📲', color: 'bg-pink-600', category: 'mobile', price: 49 },
  { id: 'call-list', title: '৩ মাস কল লিস্ট', titleEn: '3 Months Call List', description: 'মোবাইলের ৩ মাসের কল রেকর্ড', icon: '📞', color: 'bg-cyan-600', category: 'mobile', price: 349 },
  { id: 'bmet-service', title: 'BMET সেবা', titleEn: 'BMET Service', description: 'বৈদেশিক কর্মসংস্থান সংক্রান্ত সেবা', icon: '✈️', color: 'bg-sky-600', category: 'cert', price: 210 },
  { id: 'bkash-info', title: 'বিকাশ তথ্য', titleEn: 'Bkash Info', description: 'বিকাশ একাউন্টের তথ্য অনুসন্ধান', icon: '💰', color: 'bg-pink-500', category: 'mobile', price: 399 },
  { id: 'nagad-info', title: 'নগদ তথ্য', titleEn: 'Nagad Info', description: 'নগদ একাউন্টের তথ্য অনুসন্ধান', icon: '💸', color: 'bg-orange-500', category: 'mobile', price: 399 },
  { id: 'new-birth-reg', title: 'নতুন জন্মনিবন্ধন', titleEn: 'New Birth Registration', description: 'সম্পূর্ণ নতুন জন্মনিবন্ধন আবেদন', icon: '👶', color: 'bg-green-700', category: 'birth', price: 510 },
  { id: 'smart-id-card', title: 'অরিজিনাল স্মার্ট ID কার্ড', titleEn: 'Original Smart ID', description: 'স্মার্ট আইডি কার্ডের কার্ড কপি', icon: '💳', color: 'bg-purple-700', category: 'nid', price: 699, popular: true },
  { id: 'land-service', title: 'ভূমি সেবা', titleEn: 'Land Service', description: 'খতিয়ান ও দাগের তথ্য যাচাই', icon: '🏡', color: 'bg-lime-700', category: 'other', price: 100 },

  // --- আপনার আগের বাকি সার্ভিসগুলো ---
  { id: 'nid-correction', title: 'NID সংশোধন', titleEn: 'NID Correction', description: 'NID সংশোধন ফর্ম ডাউনলোড', icon: '✏️', color: 'bg-blue-600', category: 'nid', price: 0 },
  { id: 'trade-license', title: 'ট্রেড লাইসেন্স', titleEn: 'Trade License', description: 'ট্রেড লাইসেন্স আবেদন', icon: '🏪', color: 'bg-yellow-600', category: 'trade', price: 0 },
  { id: 'make-cv', title: 'CV তৈরি', titleEn: 'Make CV', description: 'পেশাদার CV তৈরি করুন', icon: '📃', color: 'bg-violet-500', category: 'other', price: 50 },
  { id: 'voter-list', title: 'ভোটার লিস্ট', titleEn: 'Voter List', description: 'ভোটার তালিকা ডাউনলোড', icon: '🗳️', color: 'bg-emerald-600', category: 'other', price: 0 },
]

export const categories = [
  { id: 'all', label: 'সকল সেবা', icon: '⚡' },
  { id: 'nid', label: 'NID সেবা', icon: '🪪' },
  { id: 'birth', label: 'জন্ম নিবন্ধন', icon: '📋' },
  { id: 'tax', label: 'TIN/ট্যাক্স', icon: '📄' },
  { id: 'mobile', label: 'মোবাইল সেবা', icon: '📱' },
  { id: 'location', label: 'লোকেশন ট্র্যাকিং', icon: '📍' },
  { id: 'cert', label: 'সনদপত্র', icon: '📜' },
  { id: 'trade', label: 'ট্রেড/ব্যবসা', icon: '🏪' },
  { id: 'other', label: 'অন্যান্য', icon: '🔧' },
]

export const stats = [
  { label: 'মোট সেবা সংখ্যা', value: '৩১', icon: '⚡' },
  { label: 'মোট ব্যবহারকারী', value: '৩,৩৯,৯৭১', icon: '👥' },
  { label: 'মোট উদ্যোক্তা', value: '৭,৬২৯', icon: '👤' },
  { label: 'মোট সেন্টার', value: '৩২৯', icon: '🏢' },
]