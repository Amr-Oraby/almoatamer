import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import BlogsList from '@/components/BlogsList';
import { serverGet } from '@/lib/api/serverRoute';
import { BlogsResponse } from '@/app/types/blog';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations('Navbar');
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page || '1';

  const response = await serverGet(`blogs?page=${page}`, false);
  const data: BlogsResponse = await response.json();

  return (
    <main className="flex flex-1 flex-col w-full bg-[#f4f6f9]/50 min-h-screen">
      <PageHeader title={t('blogs')} />
      <BlogsList data={data?.data} meta={data?.meta} />
    </main>
  );
}
