import { useTranslations } from 'next-intl';
import { CalendarRange, Handshake, Scale, Wallet, Zap, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');

  const features = [
    {
      title: t('card1Title'),
      description: t('card1Text'),
      icon: <CalendarRange className="w-8 h-8 text-amber-500" />,
      color: "bg-blue-50/50",
    },
    {
      title: t('card2Title'),
      description: t('card2Text'),
      icon: <Handshake className="w-8 h-8 text-amber-500" />,
      color: "bg-indigo-50/50",
    },
    {
      title: t('card3Title'),
      description: t('card3Text'),
      icon: <Scale className="w-8 h-8 text-amber-500" />,
      color: "bg-violet-50/50",
    },
    {
      title: t('card4Title'),
      description: t('card4Text'),
      icon: <Wallet className="w-8 h-8 text-amber-500" />,
      color: "bg-emerald-50/50",
    },
    {
      title: t('card5Title'),
      description: t('card5Text'),
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      color: "bg-orange-50/50",
    },
    {
      title: t('card6Title'),
      description: t('card6Text'),
      icon: <Lock className="w-8 h-8 text-amber-500" />,
      color: "bg-rose-50/50",
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50/50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1a2754_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2754] mb-6">
            {t('title')}
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a2754] mb-4 group-hover:text-amber-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/book-umrah/booking"
            className="inline-flex items-center justify-center gap-3 bg-[#1a2754] hover:bg-[#233570] text-white font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            <span>{t('cta')}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
