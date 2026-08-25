import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { serverGet } from '@/lib/api/serverRoute';
import { ContactForm } from '@/features/contact-us/components/ContactForm';

export default async function Page() {
  const t = await getTranslations('Navbar');
  const response = await serverGet('countries', false);
  const data = await response.json();
  const countries = data?.data || [];

  return (
    <main className="flex flex-1 flex-col w-full bg-[#f4f6f9]/50 min-h-screen">
      <PageHeader title={t('contact')} />
      <ContactForm countries={countries} />
    </main>
  );
}

