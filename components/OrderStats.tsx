import { X, Clock, CheckCircle2, CornerUpLeft, Activity } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { isAuthenticated } from '@/lib/auth';
import { serverGet } from '@/lib/api/serverRoute';

export default async function OrderStats() {
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    return null;
  }

  const response = await serverGet('client-home', true);
  const responseData = await response.json();
  const apiData = responseData?.data || {};

  let runningCount = 0;
  if (Array.isArray(apiData.running_umrahs)) {
    runningCount = apiData.running_umrahs.length;
  } else if (apiData.running_umrahs && typeof apiData.running_umrahs === 'object') {
    runningCount = 1;
  }

  const stats = [
    {
      id: 'pending',
      title: 'الطلبات المعلقة',
      count: apiData.pending_umrah_count || 0,
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      iconBg: 'bg-amber-50',
      href: '/orders?status=pending'
    },
    {
      id: 'running',
      title: 'قيد التنفيذ',
      count: runningCount,
      icon: <Activity className="w-4 h-4 text-blue-500" />,
      iconBg: 'bg-blue-50',
      href: '/orders?status=running'
    },
    {
      id: 'done',
      title: 'الطلبات المكتملة',
      count: apiData.done_umrah_count || 0,
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      iconBg: 'bg-green-50',
      href: '/orders?status=done'
    },
    {
      id: 'canceled',
      title: 'الطلبات الملغاة',
      count: apiData.canceled_umrah_count || 0,
      icon: <X className="w-4 h-4 text-red-500" />,
      iconBg: 'bg-red-50',
      href: '/orders?status=canceled'
    }
  ];

  return (
    <div className="w-full px-4 md:px-12 lg:px-24 mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat) => (
          <Link
            href={stat.href}
            key={stat.id}
            className="bg-white dark:bg-muted/10 rounded-2xl shadow-sm border border-border p-6 flex flex-col group hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between w-full mb-4">
              <div className="text-blue-600/50 transition-colors group-hover:text-blue-600 mt-1">
                <CornerUpLeft className="w-5 h-5 rtl:scale-x-[-1]" />
              </div>
              <div className={`p-2.5 rounded-xl ${stat.iconBg} dark:bg-opacity-20`}>
                {stat.icon}
              </div>
            </div>

            <div className="flex flex-col items-start w-full gap-2">
              <span className="text-muted-foreground font-semibold text-sm md:text-base">
                {stat.title}
              </span>
              <span className="text-4xl font-extrabold text-foreground">
                {stat.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
