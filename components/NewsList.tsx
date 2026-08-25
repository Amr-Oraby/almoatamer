import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { NewsItem, PaginationMeta } from '@/app/types/news';
import Pagination from '@/components/Pagination';

export default async function NewsList({ data = [], meta }: { data?: NewsItem[], meta?: PaginationMeta }) {
  const t = await getTranslations('News');


  return (
    <section className="container mx-auto px-4 md:px-12 lg:px-24 py-12 mb-24">


      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((news) => (
          <Link href={`/news/${news.slug}`} key={news.id} className="group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100/50">
              <img
                src='/images/news-1.jpeg'
                alt={news.alt || news.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug rtl:text-right ltr:text-left group-hover:text-amber-500 transition-colors duration-300">
              {news.title}
            </h3>
          </Link>
        ))}
      </div>

      <Pagination meta={meta} />
    </section>
  );
}
