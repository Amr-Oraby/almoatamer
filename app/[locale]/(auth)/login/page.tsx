import LoginForm from '@/features/auth/components/LoginForm';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale } from 'next-intl/server';

export default async function LoginPage() {
  const locale = await getLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Left side - Image/Pattern (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#f8f9fa] items-center justify-center overflow-hidden">
        {/* Decorative Islamic Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Placeholder Kaaba Image (from Unsplash for now) */}
        <div className="relative w-2/3 max-w-lg aspect-square drop-shadow-2xl z-10">
          <Image 
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop" 
            alt="Kaaba" 
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-16 xl:p-24 bg-white relative">
        {/* Header (Logo & Back Arrow) */}
        <div className="flex items-center justify-between mb-16 lg:mb-24">
          <Link href="/">
            <Image src="/logo.svg" alt="Almoatamer Logo" width={180} height={50} className="h-10 sm:h-12 w-auto" />
          </Link>
          <Link 
            href="/"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 rounded-full"
          >
            {isRtl ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
