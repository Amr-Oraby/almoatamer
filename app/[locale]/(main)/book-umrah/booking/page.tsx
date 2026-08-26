import { getTranslations } from 'next-intl/server';
import BookingClient from '@/features/booking/components/BookingClient';

export default async function Page() {
  const t = await getTranslations('Booking');
  
  return (
    <main className="flex flex-1 flex-col w-full bg-[#f8f9fc] min-h-screen">
      <div className="py-8 md:py-12">
        <BookingClient />
      </div>
    </main>
  );
}
