import { useTranslations } from 'next-intl';
import PageHeader from '@/components/PageHeader';
import NewsList from '@/components/NewsList';

export default function Page() {
  const t = useTranslations('Navbar');
  return (
    <main className="flex flex-1 flex-col w-full bg-[#f4f6f9]/50 min-h-screen">
      <PageHeader title={t('news')} />
      <NewsList />
    </main>
  );
}
