'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaSnapchatGhost } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navbar');
  const pathname = usePathname();

  const departments = [
    { href: '/', label: navT('home') },
    { href: '/blogs', label: navT('blogs') },
    { href: '/about', label: navT('about') },
    { href: '/news', label: navT('news') },
    { href: '/gallery', label: navT('gallery') },
    { href: '/book-umrah', label: navT('bookUmrah') },
  ];

  const links = [
    { href: '/privacy', label: t('privacyPolicy') },
    { href: '/terms', label: t('termsAndConditions') },
  ];

  return (
    <footer className="bg-[#fafbfc] dark:bg-muted/10 pt-12 pb-6 border-t mt-auto w-full">
      <div className="w-full px-4 md:px-12 lg:px-32 xl:px-48 mx-auto flex flex-col lg:flex-row justify-between gap-10">

        {/* Logo, description and badge */}
        <div className="flex flex-col items-center gap-6 lg:gap-4 lg:w-5/12 shrink-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link href="/" className="shrink-0">
              <Image src="/logo.svg" alt="Almoatamer Logo" width={220} height={60} className="h-14 sm:h-16 w-auto" />
            </Link>

            <p className="text-muted-foreground text-center md:text-start leading-relaxed text-sm md:text-[13px] xl:text-sm max-w-[470px]">
              {t('description')}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white dark:bg-muted/30 p-2 rounded-lg shadow-sm border mb-1 flex items-center justify-center w-14 h-14">
              {/* Placeholder for the Saudi Business Center Logo */}
              <div className="flex flex-col gap-1 items-center scale-[0.65] origin-center">
                <div className="flex items-end gap-1">
                  <div className="w-2 h-6 bg-purple-600 rounded-sm translate-y-1"></div>
                  <div className="w-2 h-8 bg-blue-500 rounded-sm"></div>
                  <div className="w-2 h-5 bg-teal-400 rounded-sm translate-y-2"></div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="w-3 h-2 bg-purple-600 rounded-sm"></div>
                  <div className="w-3 h-2 bg-blue-500 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-medium text-foreground">{t('verifiedBy')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between lg:justify-end gap-10 lg:gap-16 xl:gap-24 lg:w-7/12">
          {/* Sections */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <h3 className="font-bold text-sm xl:text-base text-foreground mb-1">{t('departments')}</h3>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1.5 w-full">
              {departments.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-primary font-medium text-xs xl:text-sm ${pathname === item.href ? 'text-primary font-bold' : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between sm:justify-start w-full sm:w-auto gap-8 sm:gap-10 lg:gap-16 xl:gap-24">
            {/* Links */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-bold text-sm xl:text-base text-foreground mb-1">{t('links')}</h3>
              <div className="flex flex-col gap-1.5">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground font-medium text-xs xl:text-sm transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-bold text-sm xl:text-base text-foreground mb-1">{t('contactUs')}</h3>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[11px] xl:text-xs text-muted-foreground">{t('callCenter')}</span>
                  <a href="tel:+9660533319553" className="text-foreground text-xs xl:text-sm hover:text-primary transition-colors font-semibold" dir="ltr">
                    +966 0533319553
                  </a>
                </div>
                <div className="flex flex-col items-start gap-0.5 mt-1">
                  <span className="text-[11px] xl:text-xs text-muted-foreground">{t('email')}</span>
                  <a href="mailto:info@almoatamer.com" className="text-foreground text-xs xl:text-sm hover:text-primary transition-colors font-semibold">
                    info@almoatamer.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border/60 my-6" />

      {/* Bottom Bar */}
      <div className="w-full px-4 md:px-12 lg:px-24 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-medium">{t('copyright')}</p>
        <div className="flex items-center gap-3 text-primary">
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaInstagram size={16} /></a>
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaSnapchatGhost size={16} /></a>
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaFacebookF size={16} /></a>
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaTwitter size={16} /></a>
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaLinkedinIn size={16} /></a>
          <a href="#" className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"><FaYoutube size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
