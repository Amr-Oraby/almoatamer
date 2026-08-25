"use client";

import { useTranslations } from 'next-intl';
import { type AboutSectionTwoData } from '@/app/types/about';

export default function AboutHistory({ data }: { data?: AboutSectionTwoData }) {
  const t = useTranslations('AboutHistory');

  return (
    <section className="relative py-16 mb-16 overflow-hidden bg-[#f4f6f9]">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2754' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2754] mb-8 rtl:text-right ltr:text-left">
            {data?.title || t('title')}
          </h2>

          {data?.description ? (
            <div
              className="space-y-6 text-gray-700 leading-relaxed rtl:text-right ltr:text-left text-base md:text-lg prose prose-p:my-0 prose-strong:text-[#1a2754]"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          ) : (
            <div className="space-y-6 text-gray-700 leading-relaxed rtl:text-right ltr:text-left text-base md:text-lg">
              <p><strong>{t('p1').split(':')[0]}:</strong> {t('p1').split(':').slice(1).join(':')}</p>
              <p><strong>{t('p2').split(':')[0]}:</strong> {t('p2').split(':').slice(1).join(':')}</p>
              <p><strong>{t('p3').split(':')[0]}:</strong> {t('p3').split(':').slice(1).join(':')}</p>
              <p><strong>{t('p4').split(':')[0]}:</strong> {t('p4').split(':').slice(1).join(':')}</p>
              <p className="pt-4 font-semibold text-[#1a2754]">{t('cr')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
