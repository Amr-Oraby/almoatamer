import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ProfileForm from '@/features/profile/components/ProfileForm';

export default async function ProfilePage() {

  const t = await getTranslations('Profile.personalDetails');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-10 w-full max-w-4xl mx-auto">

      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center mb-6 md:mb-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-md bg-gray-100">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amr"
              alt="Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-amber-500 text-white p-2.5 rounded-full shadow-lg hover:bg-amber-600 transition-colors border-2 border-white">
            <Edit2 size={16} />
          </button>
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}
