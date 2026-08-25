import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import NewsList from '@/components/NewsList';
import { serverGet } from '@/lib/api/serverRoute';
import { NewsResponse } from '@/app/types/news';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations('Navbar');
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page || '1';

  const response = await serverGet(`news?page=${page}`, false);
  const data: NewsResponse = await response.json();

  return (
    <main className="flex flex-1 flex-col w-full bg-[#f4f6f9]/50 min-h-screen">
      <PageHeader title={t('news')} />
      <NewsList data={data?.data} meta={data?.meta} />
    </main>
  );
}
