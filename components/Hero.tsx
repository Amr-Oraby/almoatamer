'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star, MapPin, Route, Camera, HeartHandshake } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Hero() {
  const t = useTranslations('Index');

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f8f5ee] to-[#fbfaf8] dark:from-muted/20 dark:to-background py-16 md:py-24 lg:py-32">
      {/* Soft background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-100/40 dark:bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="w-full px-4 md:px-12 lg:px-24 xl:px-32 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8 z-10 w-full">
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-100/60 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full font-medium text-sm border border-amber-200/50 dark:border-amber-800/50 shadow-sm text-center">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
            <span>{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-slate-900 dark:text-foreground text-center lg:text-start">
            {t('titlePart1')}
            <br className="hidden sm:block" />
            {t('titlePart2')}
            <span className={`text-primary px-1 ${t('titleHighlight') === 'devotion' ? 'italic font-serif' : ''}`}>{t('titleHighlight')}</span>
            {t('titlePart3')}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-muted-foreground leading-relaxed max-w-[540px] text-center lg:text-start">
            {t('description')}
          </p>

          {/* Buttons */}
          <div className="flex flex-row w-full sm:w-auto justify-center gap-2 sm:gap-4 mt-2">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3.5 bg-[#3169b3] hover:bg-[#255291] text-white rounded-full text-[13px] sm:text-base font-semibold whitespace-nowrap transition-all shadow-md hover:shadow-lg">
              <FaApple className="text-lg sm:text-xl shrink-0" />
              <span className="truncate">{t('appStore')}</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white rounded-full text-[13px] sm:text-base font-semibold whitespace-nowrap transition-all shadow-md hover:shadow-lg">
              <FaGooglePlay className="text-lg sm:text-xl shrink-0" />
              <span className="truncate">{t('googlePlay')}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto gap-6 sm:gap-10 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/60">
            <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-start">
              <span className="text-xl font-bold text-slate-900 dark:text-foreground">{t('stat1Value')}</span>
              <span className="text-xs text-slate-500 dark:text-muted-foreground">{t('stat1Label')}</span>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-start">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-900 dark:text-foreground">{t('stat2Value')}</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <span className="text-xs text-slate-500 dark:text-muted-foreground">{t('stat2Label')}</span>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-start hidden sm:flex">
              <span className="text-xl font-bold text-slate-900 dark:text-foreground">{t('stat3Value')}</span>
              <span className="text-xs text-slate-500 dark:text-muted-foreground">{t('stat3Label')}</span>
            </div>
          </div>
        </div>

        {/* Right Content (Mockup) */}
        <div className="hidden lg:flex relative w-full items-center justify-center lg:justify-end mt-10 lg:mt-0 z-10">
          <Image 
            src="/hero-phone-1.png" 
            alt="Almoatamer App Mockup" 
            width={600} 
            height={800} 
            className="w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

      </div>
    </section>
  );
}
