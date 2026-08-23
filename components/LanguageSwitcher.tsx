'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full font-bold uppercase h-10 w-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
      onClick={toggleLocale}
      disabled={isPending}
    >
      {locale === 'en' ? 'AR' : 'EN'}
    </Button>
  );
}
