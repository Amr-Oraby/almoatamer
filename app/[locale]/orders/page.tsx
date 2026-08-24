import { useTranslations } from 'next-intl';
import PageHeader from '@/components/PageHeader';

export default function Page() {
  const t = useTranslations('Navbar');
  return (
    <main className="flex flex-1 flex-col w-full">
      <PageHeader title={t('orders')} />
    </main>
  );
}
