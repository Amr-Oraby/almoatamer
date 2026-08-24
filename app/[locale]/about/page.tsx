import { useTranslations } from 'next-intl';

import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import AboutHistory from '@/components/AboutHistory';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';

export default function Page() {
  const t = useTranslations('Navbar');
  return (
    <main className="flex flex-1 flex-col w-full pb-16">
      <PageHeader title={t('about')} />
      <Gallery />
      <AboutHistory />
      <StatsSection />
      <Testimonials />
    </main>
  );
}