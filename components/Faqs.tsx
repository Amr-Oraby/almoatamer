import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  const t = useTranslations('Faqs');

  const faqsLeft = [0, 1, 2, 3, 4];
  const faqsRight = [5, 6, 7, 8, 9];

  return (
    <section className="py-20 md:py-28 bg-gray-50/30 relative">
      <div className="container mx-auto px-4 md:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 rounded-full px-4 py-1.5 font-semibold text-sm mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2754] mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 max-w-6xl mx-auto items-start">
          {/* Left Column */}
          <Accordion className="w-full space-y-4">
            {faqsLeft.map((index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow data-[state=open]:border-amber-500 data-[state=open]:shadow-md border-b"
              >
                <AccordionTrigger className="flex w-full items-center justify-between text-left font-bold text-gray-800 hover:text-amber-500 hover:no-underline py-5 text-base md:text-lg gap-4">
                  {t(`questions.${index}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base pb-5 leading-relaxed">
                  {t(`questions.${index}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column */}
          <Accordion className="w-full space-y-4">
            {faqsRight.map((index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className=" border border-gray-200 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow data-[state=open]:border-amber-500 data-[state=open]:shadow-md border-b"
              >
                <AccordionTrigger className=" flex w-full items-center justify-between text-left font-bold text-gray-800 hover:text-amber-500 hover:no-underline py-5 text-base md:text-lg gap-4">
                  {t(`questions.${index}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base pb-5 leading-relaxed">
                  {t(`questions.${index}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
