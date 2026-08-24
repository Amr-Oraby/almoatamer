'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Globe, 
  Bell, 
  Headset, 
  LogOut, 
  Trash2 
} from 'lucide-react';
import LanguageDialog from './LanguageDialog';

export default function ProfileSidebar() {
  const t = useTranslations('Profile.sidebar');
  const pathname = usePathname();
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

  const mainLinks = [
    { href: '/profile', label: t('personalDetails'), icon: User },
    { href: '/profile/payment', label: t('paymentDetails'), icon: CreditCard },
  ];
  
  const additionalLinks = [
    { href: '/profile/notifications', label: t('notifications'), icon: Bell },
  ];

  return (
    <>
      <div className="w-14 lg:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-fit transition-all duration-300">
        
        <div className="flex flex-col py-2 md:py-4">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 transition-colors border-s-4 ${
                  isActive 
                    ? 'border-[#1a2754] text-[#1a2754] bg-blue-50/50 font-bold' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={link.label}
              >
                <Icon size={22} className={isActive ? 'text-[#1a2754]' : 'text-gray-400'} />
                <span className="hidden lg:block">{link.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={() => setLanguageDialogOpen(true)}
            className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 transition-colors border-s-4 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 w-full text-start"
            title={t('language')}
          >
            <Globe size={22} className="text-gray-400" />
            <span className="hidden lg:block">{t('language')}</span>
          </button>

          {additionalLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 transition-colors border-s-4 ${
                  isActive 
                    ? 'border-[#1a2754] text-[#1a2754] bg-blue-50/50 font-bold' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={link.label}
              >
                <Icon size={22} className={isActive ? 'text-[#1a2754]' : 'text-gray-400'} />
                <span className="hidden lg:block">{link.label}</span>
              </Link>
            );
          })}

          <div
            className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 border-s-4 border-transparent text-gray-400 opacity-50 cursor-not-allowed w-full text-start"
            title={t('technicalSupport')}
          >
            <Headset size={22} />
            <span className="hidden lg:block">{t('technicalSupport')}</span>
          </div>
        </div>

        <div className="mt-auto border-t border-gray-100 flex flex-col py-2 md:py-4">
          <button
            className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 transition-colors border-s-4 border-transparent text-red-500 hover:bg-red-50 hover:text-red-600 w-full text-start"
            title={t('logout')}
          >
            <LogOut size={22} className="rtl:rotate-180" />
            <span className="hidden lg:block font-medium">{t('logout')}</span>
          </button>

          <button
            className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 py-3 md:py-4 transition-colors border-s-4 border-transparent text-red-500 hover:bg-red-50 hover:text-red-600 w-full text-start"
            title={t('deleteAccount')}
          >
            <Trash2 size={22} />
            <span className="hidden lg:block font-medium">{t('deleteAccount')}</span>
          </button>
        </div>

      </div>

      <LanguageDialog 
        open={languageDialogOpen} 
        onOpenChange={setLanguageDialogOpen} 
      />
    </>
  );
}
