import { useTranslations } from 'next-intl';
import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';

export default function Page() {
  const t = useTranslations('Navbar');
  return (
    <main className="flex flex-1 flex-col w-full">
      <PageHeader title={t('gallery')} />
      <Gallery />
    </main>
  );
}
