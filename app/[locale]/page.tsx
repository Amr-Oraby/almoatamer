import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Index');

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="w-full px-4 md:px-12 lg:px-24 mx-auto py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-muted-foreground">{t('description')}</p>
    </div>
    </main>
  );
}
