import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { serverGet } from '@/lib/api/serverRoute';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/app/types/news';

export default async function NewsDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }) {
  const t = await getTranslations('NewsDetails');

  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  // Fetch specific news by slug
  const response = await serverGet(`news/${slug}`, false);
  const data = await response.json();
  const newsItem: NewsItem | undefined = data?.data;

  console.log("newsItem", newsItem)

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img
          src="/images/news-1.jpeg"
          alt={newsItem.alt || newsItem.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center container mx-auto px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center max-w-4xl leading-tight md:leading-snug mb-6 drop-shadow-md">
            {newsItem.title}
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-gray-200/50 border border-gray-100 rtl:text-right ltr:text-left text-gray-700">

          <Link href="/news" className="inline-flex items-center gap-2 text-[#1a2754] hover:text-amber-500 font-semibold mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <span>{t('backToNews')}</span>
          </Link>

          <article className="prose prose-lg max-w-none text-gray-700 marker:text-amber-500 prose-headings:text-[#1a2754] prose-a:text-amber-600 hover:prose-a:text-amber-700"
            dangerouslySetInnerHTML={{ __html: newsItem.description || t.raw('fallbackDescription') }}
          />

          {/* Decorative element for the news article */}
          <div className="mt-12 p-8 bg-[#f4f6f9] border-l-4 rtl:border-r-4 rtl:border-l-0 border-amber-500 rounded-lg">
            <p className="text-lg text-gray-700 italic font-medium">
              {t('quote')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
