"use client";

import { type SectionFiveData } from '@/app/types/home';

const defaultGalleryImages = [
  { src: '/images/image-1-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-2-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-3-row-2.jpeg', colSpanClasses: 'col-span-1 md:col-span-2 lg:col-span-2' },
  { src: '/images/image-4-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-5-row-2.jpeg', colSpanClasses: 'col-span-1 md:col-span-2 lg:col-span-2' },
  { src: '/images/image-6-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
];

export default function Gallery({ data }: { data?: SectionFiveData }) {
  const colSpanClassesPattern = [
    'col-span-1 md:col-span-1 lg:col-span-1',
    'col-span-1 md:col-span-1 lg:col-span-1',
    'col-span-1 md:col-span-2 lg:col-span-2',
    'col-span-1 md:col-span-1 lg:col-span-1',
    'col-span-1 md:col-span-2 lg:col-span-2',
    'col-span-1 md:col-span-1 lg:col-span-1'
  ];

  const galleryImages = data && data.length > 0
    ? data.map((src, index) => ({
      src,
      colSpanClasses: colSpanClassesPattern[index % colSpanClassesPattern.length]
    }))
    : defaultGalleryImages;

  return (
    <section className="container mx-auto px-4 py-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-64 rounded-[2rem] overflow-hidden group ${image.colSpanClasses}`}
            >
              <img
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                onError={(event) => {
                  event.currentTarget.src = "/images/image-1-row-1.jpeg";
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
