"use client";

import { useTranslations } from 'next-intl';
import { type SectionTwoData } from '@/app/types/home';

export default function PromoSection({ data }: { data?: SectionTwoData }) {
  const t = useTranslations('Promo');

  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col-reverse md:flex-row bg-[#F7F9FC] rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 relative group">

        {/* Content Side */}
        <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-20 flex flex-col justify-center items-start z-10 relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2754] mb-5 leading-tight tracking-tight">
            {t('title')}
          </h2>
          {data?.info ? (
            <div
              className="text-[#4a5568] text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium prose prose-p:my-0 prose-strong:text-[#1a2754]"
              dangerouslySetInnerHTML={{ __html: data.info }}
            />
          ) : (
            <p className="text-[#4a5568] text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
              {t('description')}
            </p>
          )}

          <button className="bg-[#1a2754] hover:bg-[#111a3a] transition-all duration-300 text-white rounded-2xl px-8 py-5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1">
            <span className="font-bold text-lg md:text-xl">{t('buttonText')}</span>
            <span className="text-sm text-indigo-200 font-medium mt-1">{t('buttonSubtext')}</span>
          </button>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-[45%] relative min-h-[400px] md:min-h-[500px]">
          <img
            src={data?.images || "/images/ihram-promo.jpg"}
            alt={t('title')}
            onError={(event) => {
              event.currentTarget.src = "/images/ihram-promo.jpg";
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
