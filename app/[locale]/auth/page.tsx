import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default async function AuthLandingPage() {
  const t = await getTranslations('Auth'); // Assuming Auth namespace exists

  return (
    <>
      {/* Header (Logo & Language Switcher) */}
      <div className="flex items-center justify-between mb-12 lg:mb-16">
        <Link href="/">
          <Image src="/logo.svg" alt="Almoatamer Logo" width={180} height={50} className="h-10 sm:h-12 w-auto" />
        </Link>
        <LanguageSwitcher />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-12">
        
        {/* Kaaba Illustration */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
          <Image 
            src="/images/kaaba-1.svg" 
            alt="Kaaba Illustration" 
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Link href="/auth/login" className="block w-full">
            <Button 
              className="w-full bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all"
            >
              {t('loginButton') || 'Login'}
            </Button>
          </Link>

          <Link href="/auth/register" className="block w-full">
            <Button 
              variant="outline"
              className="w-full h-14 rounded-xl text-lg font-semibold transition-all border-[#16279f]/20 text-[#16279f] hover:bg-[#16279f]/5"
            >
              {t('registerNow') || 'Create New Account'}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
