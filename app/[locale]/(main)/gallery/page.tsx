import { getTranslations, getLocale } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import { serverGet } from '@/lib/api/serverRoute';

export default async function Page() {
  const t = await getTranslations('Navbar');
  const response = await serverGet(`gallery`, false);
  const data = await response.json();

  const galleryImages = data?.data;

  return (
    <main className="flex flex-1 flex-col w-full pb-16">
      <PageHeader title={t('gallery')} />
      <Gallery data={galleryImages} />
    </main>
  );
}
