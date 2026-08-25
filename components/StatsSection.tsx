"use client";

import { useTranslations } from 'next-intl';
import { FileCheck, Users, Award, Hourglass } from 'lucide-react';
import { type SectionThreeData } from '@/app/types/home';

export default function StatsSection({ data }: { data?: SectionThreeData }) {
  const t = useTranslations('Stats');

  const stats = [
    {
      icon: <FileCheck className="w-12 h-12 text-[#1a2754]" strokeWidth={1.5} />,
      value: data?.done_umrahs_count ?? t('stat1Value'),
      label: t('stat1Label'),
    },
    {
      icon: <Users className="w-12 h-12 text-[#1a2754]" strokeWidth={1.5} />,
      value: data?.moatmers_count ?? t('stat2Value'),
      label: t('stat2Label'),
    },
    {
      icon: <Award className="w-12 h-12 text-[#1a2754]" strokeWidth={1.5} />,
      value: data?.prizes ?? t('stat3Value'),
      label: t('stat3Label'),
    },
    {
      icon: <Hourglass className="w-12 h-12 text-[#1a2754]" strokeWidth={1.5} />,
      value: data?.experience_years ?? t('stat4Value'),
      label: t('stat4Label'),
    },
  ];

  return (
    <section className="relative py-24 mb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ihram-promo.jpg"
          alt="Pilgrims background"
          onError={(event) => {
            event.currentTarget.src = "/images/ihram-promo.jpg";
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          {t('title')}
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#faf9f5] border-2 border-amber-200/80 rounded-2xl p-6 flex items-center justify-center gap-6 shadow-xl transform transition-transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center">
                {stat.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col rtl:text-right ltr:text-left">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-[#1a2754] mb-1 drop-shadow-sm">
                  {stat.value}
                </span>
                <span className="text-[#4a5568] font-medium text-lg leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
