import { serverGet } from '@/lib/api/serverRoute';
import { getTranslations } from 'next-intl/server';
import { Bell, CreditCard, User } from 'lucide-react';

interface SenderData {
  id: number;
  name: string;
  email: string;
  phone: string;
  phone_code: string;
  image: string;
  is_active: boolean;
  gender: string;
}

interface Notification {
  id: string;
  sending_time_ago: string;
  created_at: string;
  sending_time: string;
  read_at: string | null;
  is_readed: boolean;
  notify_type: string;
  sender_data: SenderData | null;
  umrah_id: number | null;
  title: string;
  body: string;
  image: string | null;
}

export default async function NotificationsPage() {
  const t = await getTranslations('Profile.sidebar');
  const data = await serverGet('show-notifications', true);
  const nestedData = await data.json();
  const notifications: Notification[] = nestedData?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full min-h-[400px]">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{t('notifications')}</h2>
        {notifications.length > 0 && (
          <span className="bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full">
            {notifications.length} إشعار
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">لا توجد إشعارات جديدة</p>
          <p className="text-sm text-gray-400 mt-1">سنخبرك عندما يكون هناك شيء مهم</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((notification) => {
            const isTransaction = notification.notify_type === 'transactions';
            const Icon = isTransaction ? CreditCard : Bell;
            const iconBg = isTransaction ? 'bg-emerald-50' : 'bg-purple-50';
            const iconColor = isTransaction ? 'text-emerald-600' : 'text-purple-600';

            return (
              <div 
                key={notification.id}
                className={`relative flex flex-col md:flex-row gap-5 p-5 rounded-xl border transition-all duration-200 hover:shadow-md bg-white ${
                  notification.is_readed ? 'border-gray-100 opacity-80' : 'border-purple-100 shadow-sm'
                }`}
              >
                {!notification.is_readed && (
                  <div className="absolute top-5 start-5 w-2.5 h-2.5 bg-purple-600 rounded-full" />
                )}
                
                {/* Icon / Image */}
                <div className="flex-shrink-0 mt-1">
                  {notification.image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={notification.image} 
                        alt={notification.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBg}`}>
                      <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className={`text-base md:text-lg font-semibold ${notification.is_readed ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap">
                      <span className="font-medium bg-gray-50 px-2 py-1 rounded-md">{notification.sending_time}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>{notification.sending_time_ago}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {notification.body}
                  </p>
                  
                  {notification.sender_data && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 overflow-hidden">
                        {notification.sender_data.image ? (
                           <img 
                             src={notification.sender_data.image} 
                             alt={notification.sender_data.name}
                             className="w-full h-full object-cover"
                           />
                        ) : (
                           <User className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        مرسل من: <span className="text-gray-700">{notification.sender_data.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
