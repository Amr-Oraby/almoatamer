import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import { Suspense } from 'react';

export default async function ResetPasswordPage() {
  const locale = await getLocale();
  const isRtl = locale === 'ar';

  return (
    <>
      {/* Header (Logo & Back Arrow) */}
      <div className="flex items-center justify-between mb-16 lg:mb-24">
        <Link href="/auth/login">
          <Image src="/logo.svg" alt="Almoatamer Logo" width={180} height={50} className="h-10 sm:h-12 w-auto" />
        </Link>
        <Link
          href="/auth/login"
          className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 rounded-full"
        >
          {!isRtl ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
        </Link>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col justify-center">
        <Suspense fallback={<div className="flex justify-center p-8">جاري التحميل...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </>
  );
}
