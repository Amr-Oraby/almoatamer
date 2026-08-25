import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';

export default async function Page() {
  const t = await getTranslations('Navbar');
  return (
    <main className="flex flex-1 flex-col w-full">
      <PageHeader title={t('orders')} />
    </main>
  );
}
