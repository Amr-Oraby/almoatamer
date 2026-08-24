import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { useTranslations } from 'next-intl';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Profile.personalDetails');

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-6 md:py-16">
      <div className="container mx-auto px-2 md:px-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6 md:mb-10 px-2 md:px-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2754]">
            {t('title')}
          </h1>
        </div>

        <div className="flex gap-3 md:gap-6 lg:gap-10">
          <ProfileSidebar />
          <div className="flex-1 w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
