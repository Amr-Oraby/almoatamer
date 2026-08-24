import Image from 'next/image';

const galleryImages = [
  { src: '/images/image-1-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-2-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-3-row-2.jpeg', colSpanClasses: 'col-span-1 md:col-span-2 lg:col-span-2' },
  { src: '/images/image-4-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
  { src: '/images/image-5-row-2.jpeg', colSpanClasses: 'col-span-1 md:col-span-2 lg:col-span-2' },
  { src: '/images/image-6-row-1.jpeg', colSpanClasses: 'col-span-1 md:col-span-1 lg:col-span-1' },
];

export default function Gallery() {
  return (
    <section className="container mx-auto px-4 py-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-64 rounded-[2rem] overflow-hidden group ${image.colSpanClasses}`}
            >
              <Image
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
