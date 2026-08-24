"use client";

import { useTranslations } from 'next-intl';
import { Phone, Mail, ChevronDown, Send } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12 mb-24">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col-reverse lg:flex-row">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-3/5 p-5 md:p-12 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            
            {/* Full Name */}
            <div>
              <input 
                type="text" 
                placeholder={t('fullNamePlaceholder')} 
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex gap-3 md:gap-4">
              {/* Country Code Dropdown (Visual only for UI) */}
              <button 
                type="button" 
                className="flex items-center gap-1.5 md:gap-2 px-3 py-3 md:px-4 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 font-medium whitespace-nowrap shrink-0"
                dir="ltr"
              >
                <span>🇸🇦</span>
                <span>+966</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </button>
              <input 
                type="tel" 
                placeholder={t('phonePlaceholder')} 
                className="flex-1 w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 rtl:text-right ltr:text-left"
                required
                dir="auto"
              />
            </div>

            {/* Email */}
            <div>
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')} 
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea 
                placeholder={t('messagePlaceholder')} 
                rows={5}
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#1a2754] hover:bg-[#233570] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              <span>{t('submitButton')}</span>
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5 rtl:rotate-180" />
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="w-full lg:w-2/5 bg-[#1a2754] p-6 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          
          {/* Decorative Circles */}
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          {/* Subtly visible overlapping circles as requested by the design */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 border-[40px] border-white/5 rounded-full"></div>
          <div className="absolute bottom-12 -left-8 w-48 h-48 border-[30px] border-white/5 rounded-full"></div>

          <div className="relative z-10 space-y-4 text-center lg:text-start lg:rtl:text-right lg:ltr:text-left mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t('contactInfoTitle')}</h2>
            <p className="text-white/80 font-medium text-lg">{t('contactInfoSubtitle')}</p>
          </div>

          <div className="relative z-10 space-y-8 flex-1 flex flex-col justify-center">
            
            <a href="tel:+9660533319553" className="flex items-center justify-center lg:justify-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all shadow-lg shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-wider" dir="ltr">{t('phone')}</span>
            </a>

            <a href="mailto:info@almoatamer.com" className="flex items-center justify-center lg:justify-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all shadow-lg shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold">{t('email')}</span>
            </a>

          </div>

          {/* Social Media */}
          <div className="relative z-10 flex items-center justify-center lg:justify-end gap-4 mt-12 pt-8 border-t border-white/10">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a2754] transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a2754] transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a2754] transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
