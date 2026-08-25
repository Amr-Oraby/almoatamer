import { useTranslations } from 'next-intl';

import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import { serverGet } from '@/lib/api/serverRoute';

export default async function HomePage() {
  const response = await serverGet(`home`, false);
  const data = await response.json()

  const sectionOne = data?.data?.section_one;
  const sectionTwo = data?.data?.section_two;
  const sectionThree = data?.data?.section_three;
  const sectionFour = data?.data?.section_four;
  const sectionFive = data?.data?.section_five;

  return (
    <main className="flex flex-1 flex-col w-full">
      <Hero data={sectionOne} />
      <PromoSection data={sectionTwo} />
      <StatsSection data={sectionThree} />
      <Testimonials data={sectionFour} />
      <Gallery data={sectionFive} />
    </main>
  );
}
