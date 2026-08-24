import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BookingSteps() {
  const t = useTranslations('BookingSteps');

  const steps = [
    { num: "01", title: t('step1Title'), text: t('step1Text') },
    { num: "02", title: t('step2Title'), text: t('step2Text') },
    { num: "03", title: t('step3Title'), text: t('step3Text') },
    { num: "04", title: t('step4Title'), text: t('step4Text') },
    { num: "05", title: t('step5Title'), text: t('step5Text') },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2754] mb-6">
            {t('title')}
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 flex justify-center relative order-1 lg:order-none">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl scale-75"></div>
            <div className="relative z-10 w-64 md:w-80 lg:w-96 hover:scale-105 transition-transform duration-700">
              <Image 
                src="/images/steps.png" 
                alt="Booking Steps" 
                width={500} 
                height={1000} 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Steps Side */}
          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-none">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0 relative">
                  {/* Decorative line between steps */}
                  {index !== steps.length - 1 && (
                    <div className="absolute top-14 bottom-[-2rem] left-1/2 -translate-x-1/2 w-0.5 bg-gray-100 group-hover:bg-amber-100 transition-colors"></div>
                  )}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gray-50 text-[#1a2754] font-bold text-xl flex items-center justify-center border-2 border-gray-100 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    {step.num}
                  </div>
                </div>
                <div className="pb-4">
                  <h3 className="text-xl font-bold text-[#1a2754] mb-2 group-hover:text-amber-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
