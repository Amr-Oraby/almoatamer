import { useTranslations } from 'next-intl';

import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col w-full">
      <Hero />
      <PromoSection />
      <StatsSection />
      <Testimonials />
      <Gallery />
    </main>
  );
}
