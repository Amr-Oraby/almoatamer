import { useTranslations } from 'next-intl';

export default function NotificationsPage() {
  const t = useTranslations('Profile.sidebar');
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 w-full min-h-[400px] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-gray-300 mb-2">{t('notifications')}</h2>
      <p className="text-gray-400">You have no new notifications.</p>
    </div>
  );
}
