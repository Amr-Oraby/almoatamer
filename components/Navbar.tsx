'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, Bell, User, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaSnapchatGhost } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import TopBar from './TopBar';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/orders', label: t('orders') },
    { href: '/messages', label: t('messages') },
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
                className={`text-base xl:text-lg font-medium py-2 transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <LanguageSwitcher />

            <Link href="/profile/notifications">
              <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground h-10 w-10 sm:h-12 sm:w-12">
                <Bell className="h-6 w-6 sm:h-7 sm:w-7" />
                <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 h-2.5 w-2.5 p-0 rounded-full bg-red-500 border-none" />
              </Button>
            </Link>
            
            <Link href="/profile">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border cursor-pointer hover:opacity-80 transition-opacity bg-white">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amr" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
              </Avatar>
            </Link>

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
                          className={`text-lg font-medium px-6 py-4 transition-all duration-200 border-l-4 ${
                            isActive 
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
