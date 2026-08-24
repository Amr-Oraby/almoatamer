import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default async function NewsDetailsPage({ params }: { params: Promise<{ locale: string; id: string }> | { locale: string; id: string } }) {
  // Await params for Next.js 15 compatibility
  const resolvedParams = await Promise.resolve(params);
  const { locale, id } = resolvedParams;

  const t = await getTranslations('NewsDetails');
  const isRtl = locale === 'ar';

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <Image
          src="/images/news-1.jpeg"
          alt={t('title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center container mx-auto px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center max-w-4xl leading-tight md:leading-snug mb-6 drop-shadow-md">
            {t('title')}
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-gray-200/50 border border-gray-100 rtl:text-right ltr:text-left text-gray-700">

          <Link href="/news" className="inline-flex items-center gap-2 text-[#1a2754] hover:text-amber-500 font-semibold mb-8 transition-colors group">
            {isRtl ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />}
            <span>{isRtl ? 'العودة إلى الأخبار' : 'Back to News'}</span>
          </Link>

          <article className="prose prose-lg max-w-none prose-headings:text-[#1a2754] prose-a:text-amber-600">
            <p className="text-xl md:text-2xl text-[#1a2754] font-medium leading-relaxed mb-8">
              {t('intro')}
            </p>

            <p className="text-lg leading-relaxed text-gray-600 mb-8">
              {t('content')}
            </p>

            {/* Added a decorative element for the news article */}
            <div className="my-12 p-8 bg-[#f4f6f9] border-l-4 rtl:border-r-4 rtl:border-l-0 border-amber-500 rounded-lg">
              <p className="text-lg text-gray-700 italic font-medium">
                {isRtl ? "نلتزم بتقديم أفضل الخدمات لضيوف الرحمن لتكون رحلتهم ذكرى لا تُنسى." : "We are committed to providing the best services to the guests of Allah to make their journey an unforgettable memory."}
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
