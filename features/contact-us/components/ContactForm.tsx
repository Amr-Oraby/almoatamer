"use client";

import { Phone, Mail, ChevronDown, Send } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hooks } from '../hooks';

export function ContactForm({ countries = [] }: { countries?: any[] }) {
  const { form, mutation, onSubmit, t } = hooks.useContactUs();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const selectedCountryCode = watch("phone_code");

  return (
    <section className="relative z-10 -mt-16 md:-mt-24 w-[95%] sm:w-[90%] max-w-7xl mx-auto mb-20 md:mb-32 px-2 sm:px-0">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row overflow-hidden border border-gray-100">

        {/* Left Side: Form */}
        <div className="w-full lg:w-3/5 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 lg:mb-12 text-center lg:text-start lg:rtl:text-right lg:ltr:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2754] mb-4">{t('formTitle')}</h2>
            <p className="text-gray-500 font-medium text-lg">{t('formSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 max-w-2xl">
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder={t('fullNamePlaceholder')}
                {...register("name", { required: true })}
                className={`w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700`}
              />
            </div>

            {/* Phone */}
            <div className="flex gap-3 md:gap-4">
              {/* Country Code Dropdown */}
              <div className="shrink-0 h-full">
                <Select value={selectedCountryCode} onValueChange={(val) => val && setValue("phone_code", val)}>
                  <SelectTrigger
                    className="w-[100px] md:w-[110px] h-auto data-[size=default]:h-auto px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 font-medium focus:ring-amber-500 focus:ring-2 focus:ring-offset-0 focus:outline-none"
                    dir="ltr"
                  >
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64" dir="ltr" alignItemWithTrigger={false}>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.code.toString()} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">+{country.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <input
                type="tel"
                placeholder={t('phonePlaceholder')}
                {...register("phone", { required: true, pattern: /^[0-9]+$/ })}
                className={`flex-1 w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 rtl:text-right ltr:text-left`}
                dir="auto"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className={`w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700`}
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                placeholder={t('messagePlaceholder')}
                rows={5}
                {...register("message_text", { required: true })}
                className={`w-full px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 border ${errors.message_text ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 resize-none`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#1a2754] hover:bg-[#233570] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              <span>{t('submitButton')}</span>
              {mutation.isPending ? (
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
