import { useTranslations } from 'next-intl';
import PromoSection from '@/components/PromoSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import BookingSteps from '@/components/BookingSteps';
import Faqs from '@/components/Faqs';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Page() {
  const t = useTranslations('BookUmrah');

  return (
    <main className="flex flex-1 flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-[#1a2754] text-white py-24 md:py-32 lg:py-40 overflow-hidden flex items-center justify-center min-h-[60vh]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 border-[40px] border-white/5 rounded-full"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('heroDescription')}
          </p>
          <Link
            href="/book-umrah/booking"
            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-[#1a2754] font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-[0_8px_30px_rgb(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.5)] hover:-translate-y-1 group"
          >
            <span>{t('cta')}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <PromoSection />
      <WhyChooseUs />
      <BookingSteps />
      <Faqs />
      <StatsSection />
      <Testimonials />
    </main>
  );
}
