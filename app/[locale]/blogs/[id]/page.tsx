import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default async function BlogDetailsPage({ params }: { params: Promise<{ locale: string; id: string }> | { locale: string; id: string } }) {
  // Await params for Next.js 15 compatibility, but fallback if it's already an object
  const resolvedParams = await Promise.resolve(params);
  const { locale, id } = resolvedParams;

  const t = await getTranslations('BlogDetails');
  const isRtl = locale === 'ar';

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <Image
          src="/images/blogs-1.webp"
          alt={t('title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center container mx-auto px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center max-w-4xl leading-tight md:leading-snug mb-6 drop-shadow-md">
            {t('title')}
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-gray-200/50 border border-gray-100 rtl:text-right ltr:text-left text-gray-700">

          <Link href="/blogs" className="inline-flex items-center gap-2 text-[#1a2754] hover:text-amber-500 font-semibold mb-8 transition-colors group">
            {isRtl ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />}
            <span>{isRtl ? 'العودة إلى المدونات' : 'Back to Blogs'}</span>
          </Link>

          <p className="text-xl md:text-2xl text-[#1a2754] font-medium leading-relaxed mb-12">
            {t('intro')}
          </p>

          <div className="space-y-12 text-lg">

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section1Title')}</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3">{t('section1Sub1Title')}</h3>
                  <p className="leading-relaxed text-gray-600">{t('section1Sub1Text')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3">{t('section1Sub2Title')}</h3>
                  <p className="leading-relaxed text-gray-600">{t('section1Sub2Text')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3">{t('section1Sub3Title')}</h3>
                  <p className="leading-relaxed text-gray-600">{t('section1Sub3Text')}</p>
                  <p className="mt-3 text-base text-gray-500 bg-gray-50 p-4 rounded-xl inline-block w-full">
                    <span className="font-medium mr-2 rtl:ml-2 rtl:mr-0">{t('readMore1')}</span>
                    <a href={t('link1Url')} target="_blank" rel="noreferrer" className="text-[#1a2754] hover:text-amber-600 font-bold underline underline-offset-4 decoration-amber-200 decoration-2 transition-all">{t('link1')}</a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3">{t('section1Sub4Title')}</h3>
                  <p className="leading-relaxed text-gray-600">{t('section1Sub4Text')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3">{t('section1Sub5Title')}</h3>
                  <p className="leading-relaxed text-gray-600">{t('section1Sub5Text')}</p>
                  <p className="mt-3 text-base text-gray-500 bg-gray-50 p-4 rounded-xl inline-block w-full">
                    <span className="font-medium mr-2 rtl:ml-2 rtl:mr-0">{t('readMore2')}</span>
                    <a href={t('link2Url')} target="_blank" rel="noreferrer" className="text-[#1a2754] hover:text-amber-600 font-bold underline underline-offset-4 decoration-amber-200 decoration-2 transition-all">{t('link2')}</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section2Title')}</h2>
              <ul className="list-disc rtl:pr-6 ltr:pl-6 space-y-3 text-gray-600 marker:text-amber-500">
                <li>{t('s2b1')}</li>
                <li>{t('s2b2')}</li>
                <li>{t('s2b3')}</li>
                <li>{t('s2b4')}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section3Title')}</h2>
              <ul className="list-disc rtl:pr-6 ltr:pl-6 space-y-3 text-gray-600 marker:text-amber-500">
                <li>{t('s3b1')}</li>
                <li>{t('s3b2')}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section4Title')}</h2>
              <p className="leading-relaxed text-gray-600">{t('section4Text')}</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">{t('section5Title')}</h2>
              <ul className="list-disc rtl:pr-6 ltr:pl-6 space-y-3 text-gray-600 marker:text-red-500">
                <li>{t('s5b1')}</li>
                <li>{t('s5b2')}</li>
                <li>{t('s5b3')}</li>
                <li>{t('s5b4')}</li>
                <li>{t('s5b5')}</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section6Title')}</h2>
              <ul className="list-disc rtl:pr-6 ltr:pl-6 space-y-3 text-gray-600 marker:text-amber-500">
                <li>{t('s6b1')}</li>
                <li>{t('s6b2')}</li>
                <li>{t('s6b3')}</li>
                <li>{t('s6b4')}</li>
                <li>{t('s6b5')}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-6">{t('section7Title')}</h2>
              <ul className="list-disc rtl:pr-6 ltr:pl-6 space-y-3 text-gray-600 marker:text-amber-500">
                <li>{t('s7b1')}</li>
                <li>{t('s7b2')}</li>
                <li>{t('s7b3')}</li>
                <li>{t('s7b4')}</li>
                <li>{t('s7b5')}</li>
              </ul>
            </section>

            {/* Section 8: FAQ */}
            <section className="bg-gray-50 rounded-2xl p-6 md:p-8 mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2754] mb-8">{t('section8Title')}</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#1a2754] mb-2">{t('q1')}</h4>
                  <p className="text-gray-600">{t('a1')}</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#1a2754] mb-2">{t('q2')}</h4>
                  <p className="text-gray-600">{t('a2')}</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#1a2754] mb-2">{t('q3')}</h4>
                  <p className="text-gray-600">{t('a3')}</p>
                </div>
                <div className="pb-2">
                  <h4 className="font-bold text-[#1a2754] mb-2">{t('q4')}</h4>
                  <p className="text-gray-600">{t('a4')}</p>
                </div>
              </div>
            </section>

            {/* Conclusion & CTA */}
            <section className="pt-8">
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
                  {isRtl ? 'احجز عمرة البدل الآن' : 'Book Substitute Umrah Now'}
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
