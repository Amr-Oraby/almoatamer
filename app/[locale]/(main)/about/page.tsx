import { getTranslations, getLocale } from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import AboutHistory from '@/components/AboutHistory';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import { serverGet } from '@/lib/api/serverRoute';

export default async function Page() {
  const t = await getTranslations('Navbar');
  const response = await serverGet(`about`, false, { "os": "web", });
  const data = await response.json();

  const sectionOne = data?.data?.section_one;
  const sectionTwo = data?.data?.section_two;
  const sectionThree = data?.data?.section_three;
  const sectionFour = data?.data?.section_four;
  return (
    <main className="flex flex-1 flex-col w-full pb-16">
      <PageHeader title={t('about')} />
      <Gallery data={sectionOne} />
      <AboutHistory data={sectionTwo} />
      <StatsSection data={sectionThree} />
      <Testimonials data={sectionFour} />
    </main>
  );
}