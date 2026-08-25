import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { serverGet } from '@/lib/api/serverRoute';
import { notFound } from 'next/navigation';
import { BlogItem } from '@/app/types/blog';

export default async function BlogDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }) {
  const t = await getTranslations('BlogDetails');

  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  // Fetch specific blog by slug
  const response = await serverGet(`blog/${slug}`, false);
  const data = await response.json();
  const blog: BlogItem | undefined = data?.data;

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img
          src={"/images/blogs-1.webp"}
          alt={blog.alt || blog.title}

          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center container mx-auto px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center max-w-4xl leading-tight md:leading-snug mb-6 drop-shadow-md">
            {blog.title}
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-gray-200/50 border border-gray-100 rtl:text-right ltr:text-left text-gray-700">

          <Link href="/blogs" className="inline-flex items-center gap-2 text-[#1a2754] hover:text-amber-500 font-semibold mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <span>{t('backToBlogs')}</span>
          </Link>

          <div className="prose prose-lg max-w-none text-gray-700 marker:text-amber-500 prose-headings:text-[#1a2754] prose-a:text-amber-600 hover:prose-a:text-amber-700"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Conclusion & CTA */}
          <section className="pt-12">
            <p className="text-lg leading-relaxed text-gray-600 mb-8 font-medium">
              {t('conclusion')}
            </p>

            <div className="bg-[#1a2754] text-white p-8 md:p-10 rounded-2xl text-center shadow-xl shadow-[#1a2754]/20">
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                {t('callToActionPrefix')}
                <a href={t('callToActionBrandUrl')} target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline">{t('callToActionBrand')}</a>
                {t('callToActionMiddle')}
                <a href={t('callToActionLinkUrl')} target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline">{t('callToActionLink')}</a>
                {t('callToActionSuffix')}
              </p>
              <Link href="/book-umrah" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105">
                {t('bookSubstituteUmrahNow')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
