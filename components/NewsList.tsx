import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function NewsList() {
  const t = useTranslations('News');

  const newsItems = [
    {
      id: 1,
      image: '/images/news-1.jpeg',
      title: t('news1'),
    },
    {
      id: 2,
      image: '/images/news-1.jpeg',
      title: t('news2'),
    },
    {
      id: 3,
      image: '/images/news-1.jpeg',
      title: t('news3'),
    },
    {
      id: 4,
      image: '/images/news-1.jpeg',
      title: t('news3'),
    },
    {
      id: 5,
      image: '/images/news-1.jpeg',
      title: t('news2'),
    },
    {
      id: 6,
      image: '/images/news-1.jpeg',
      title: t('news1'),
    }
  ];

  return (
    <section className="container mx-auto px-4 md:px-12 lg:px-24 py-12 mb-24">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <Link href={`/news/${news.id}`} key={news.id} className="group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100/50">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug rtl:text-right ltr:text-left group-hover:text-amber-500 transition-colors duration-300">
              {news.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
