import { serverGet } from '@/lib/api/serverRoute';
import PageHeader from '@/components/PageHeader';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await serverGet('terms-and-conditions', false);
    const data = await response.json();
    const seo = data?.seo_meta;

    if (seo) {
      return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
          canonical: seo.canonical,
        },
      };
    }
  } catch (error) {
    console.error('Failed to fetch SEO meta for terms and conditions:', error);
  }
  
  const t = await getTranslations('Footer');
  return {
    title: t('termsAndConditions'),
  };
}

export default async function Page() {
  const response = await serverGet('terms-and-conditions', false);
  const data = await response.json();
  
  const termsData = data?.data;

  return (
    <main className="flex flex-1 flex-col w-full pb-16">
      <PageHeader title={termsData?.title || 'Terms and Conditions'} />
      
      <section className="container mx-auto px-4 md:px-8 max-w-4xl mt-8">
        <div className="bg-white dark:bg-muted/10 rounded-2xl shadow-sm border border-border p-6 md:p-10 lg:p-12 overflow-hidden">
          {termsData?.desc ? (
            <div 
              className="text-muted-foreground leading-relaxed [&_:is(h1,h2,h3,h4,h5,h6)]:text-foreground [&_:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_:is(h1,h2,h3,h4,h5,h6)]:mt-8 [&_:is(h1,h2,h3,h4,h5,h6)]:mb-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_p]:mb-5 [&_:is(ol,ul)]:ms-6 [&_:is(ol,ul)]:mb-6 [&_ol]:list-decimal [&_ul]:list-disc [&_li]:mb-2 [&_strong]:text-foreground [&_a]:text-amber-500 [&_a]:underline hover:[&_a]:text-amber-600 [&_hr]:my-8 [&_hr]:border-border"
              dangerouslySetInnerHTML={{ __html: termsData.desc }} 
            />
          ) : (
            <div className="flex flex-col justify-center items-center py-20 text-muted-foreground">
              <p>No content available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
