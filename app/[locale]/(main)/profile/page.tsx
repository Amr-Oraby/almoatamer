import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ProfileForm from '@/features/profile/components/ProfileForm';

export default async function ProfilePage() {

  const t = await getTranslations('Profile.personalDetails');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-10 w-full max-w-4xl mx-auto">
      <ProfileForm />
    </div>
  );
}
