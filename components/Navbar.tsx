'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, Bell, User, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaSnapchatGhost } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import TopBar from './TopBar';
import Image from 'next/image';

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    ...(isLoggedIn ? [{ href: '/orders', label: t('orders') }] : []),
    ...(isLoggedIn ? [{ href: '/messages', label: t('messages') }] : []),
    { href: '/gallery', label: t('gallery') },
    { href: '/blogs', label: t('blogs') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
    { href: '/book-umrah', label: t('bookUmrah') },
  ];

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      <TopBar />
      <header className="bg-background/80 backdrop-blur-md border-b shadow-sm transition-all w-full">
        <nav className="w-full px-4 md:px-12 lg:px-24 mx-auto h-24 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="Almoatamer Logo" width={220} height={60} className="h-14 sm:h-16 w-auto" priority />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base xl:text-lg font-medium py-2 transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-bold' : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <LanguageSwitcher />

            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/profile/notifications" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Bell className="h-6 w-6" />
                </Link>
                <Link href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white overflow-hidden transition-opacity hover:opacity-90">
                  <User className="h-6 w-6" />
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-full shadow-md transition-all hidden sm:flex">
                  {t('login')}
                </Button>
              </Link>
            )}

            {/* Mobile Drawer */}
            <Sheet>
              <SheetTrigger className="lg:hidden ml-2 flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                {/* Drawer Header */}
                <div className="p-6 border-b flex items-center justify-center bg-muted/30">
                  <Image src="/logo.svg" alt="Almoatamer Logo" width={200} height={50} className="h-12 w-auto" />
                </div>

                {/* Drawer Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`text-lg font-medium px-6 py-4 transition-all duration-200 border-l-4 ${isActive
                            ? 'text-primary font-bold bg-primary/5 border-primary'
                            : 'text-muted-foreground border-transparent hover:text-primary hover:bg-muted/50 hover:border-primary/50'
                            }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                      <Link href="/profile" className="flex items-center gap-3 flex-1 bg-muted/50 hover:bg-muted p-3 rounded-xl transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white">
                          <User className="h-6 w-6" />
                        </div>
                        <span className="font-semibold text-foreground">Profile</span>
                      </Link>
                      <Link href="/profile/notifications" className="p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-primary">
                        <Bell className="h-6 w-6" />
                      </Link>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 rounded-xl shadow-md transition-all text-lg">
                        {t('login')}
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t bg-muted/20">
                  <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Contact Us</p>
                    <a href="tel:+9660533319553" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Phone size={18} />
                      <span dir="ltr">+966 0533319553</span>
                    </a>
                    <a href="mailto:info@almoatamer.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Mail size={18} />
                      <span>info@almoatamer.com</span>
                    </a>
                  </div>

                  {/* Social Icons in Drawer */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/50 text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors"><FaInstagram size={18} /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><FaSnapchatGhost size={18} /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><FaFacebookF size={18} /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><FaTwitter size={18} /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><FaLinkedinIn size={18} /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><FaYoutube size={18} /></Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </header>
    </div>
  );
}
