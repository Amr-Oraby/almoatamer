"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Star, MessageCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { type SectionFourData } from '@/app/types/home';

const AVATARS = [
  "https://i.pravatar.cc/150?img=47", // Random female avatar for Fatima
  "https://i.pravatar.cc/150?img=11", // Random male avatar for Yusuf
  "https://i.pravatar.cc/150?img=32", // Random female avatar for Aisha
  "https://i.pravatar.cc/150?img=68", // Random male avatar for Ahmad
  "https://i.pravatar.cc/150?img=12", // Random female avatar for Maryam
];

export default function Testimonials({ data }: { data?: SectionFourData }) {
  const t = useTranslations('Testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const defaultReviews = [0, 1, 2, 3, 4].map((index) => ({
    name: t(`reviews.${index}.name`),
    role: t(`reviews.${index}.role`),
    quote: t(`reviews.${index}.quote`),
    avatar: AVATARS[index],
  }));

  const reviews = data && data.length > 0
    ? data.map((testimonial) => ({
      name: testimonial.name,
      role: t('badge'), // Fallback role if there is none
      quote: testimonial.text,
      avatar: testimonial.image
    }))
    : defaultReviews;
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center text-center mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-medium text-sm mb-6 border border-amber-100 shadow-sm">
          <MessageCircle className="w-4 h-4 fill-current" />
          {t('badge')}
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a2754] mb-4">
          {t('titleStart')}
          <span className="text-amber-500 relative">
            {t('titleHighlight')}
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: isRtl ? 'rtl' : 'ltr',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 rtl:-mr-4 rtl:-ml-0">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 rtl:pr-4 rtl:pl-0 md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <Card className="bg-[#f8f9fa] border-none shadow-sm hover:shadow-md transition-shadow rounded-[2rem] h-full flex flex-col justify-between">
                    <CardContent className="px-4 py-6 flex flex-col justify-between h-full">
                      <div>
                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-[#4a5568] text-lg leading-relaxed mb-2">
                          {review.quote}
                        </p>
                      </div>

                      {/* Profile */}
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-200">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            onError={(event) => {
                              event.currentTarget.src = "https://i.pravatar.cc/150?img=68";
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1a2754] text-start">{review.name}</h4>
                          <p className="text-sm text-gray-500 text-start">{review.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="border-gray-200" />
            <CarouselNext className="border-gray-200" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
