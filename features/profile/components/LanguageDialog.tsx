'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LanguageDialog({ open, onOpenChange }: LanguageDialogProps) {
  const t = useTranslations('Profile.languageModal');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: string) => {
    if (locale === newLocale) {
      onOpenChange(false);
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            variant={locale === 'en' ? 'default' : 'outline'}
            className="justify-start w-full text-lg h-14"
            onClick={() => changeLanguage('en')}
            disabled={isPending}
          >
            <span className="text-2xl mr-4 rtl:ml-4 rtl:mr-0">🇬🇧</span> {t('english')}
          </Button>
          <Button 
            variant={locale === 'ar' ? 'default' : 'outline'}
            className="justify-start w-full text-lg h-14"
            onClick={() => changeLanguage('ar')}
            disabled={isPending}
          >
            <span className="text-2xl ml-4 rtl:ml-0 rtl:mr-4">🇸🇦</span> {t('arabic')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
