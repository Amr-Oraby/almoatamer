import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const t = useTranslations('Profile.personalDetails');

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

      <form className="space-y-4 md:space-y-6">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700 font-bold flex justify-start">
            <span className="text-red-500 mx-1">*</span> {t('fullName')}
          </Label>
          <Input 
            id="fullName" 
            defaultValue="Amr Oraby" 
            className="h-12 bg-white border-gray-200 px-4 rounded-xl shadow-sm focus-visible:ring-amber-500"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="text-gray-700 font-bold flex justify-start">
            <span className="text-red-500 mx-1">*</span> {t('mobileNumber')}
          </Label>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition-all" dir="ltr">
            <Input 
              id="mobileNumber" 
              defaultValue="109147071"
              placeholder={t('enterMobile')}
              className="h-12 border-0 shadow-none bg-transparent px-4 focus-visible:ring-0 flex-1 min-w-0"
            />
            <div className="flex items-center border-l border-gray-200 px-2 bg-gray-50 w-28 shrink-0">
              <Select defaultValue="sa">
                <SelectTrigger className="border-0 shadow-none focus:ring-0 px-2 gap-2 w-full h-11 bg-transparent hover:bg-gray-100 transition-colors rounded-none">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">+966</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">
                    <div className="flex items-center gap-2">
                      <span>🇸🇦</span> <span>+966</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="eg">
                    <div className="flex items-center gap-2">
                      <span>🇪🇬</span> <span>+20</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <Link href="#" className="text-sm text-amber-500 hover:text-amber-600 font-medium hover:underline transition-colors">
              {t('changeMobileNumber')}
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">{t('email')}</Label>
          <Input 
            id="email" 
            type="email"
            defaultValue="amre0603@gmail.com" 
            className="h-12 bg-white border-gray-200 px-4 rounded-xl shadow-sm focus-visible:ring-amber-500"
            dir="ltr"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="sr-only">{t('country')}</Label>
          <Select defaultValue="sa">
            <SelectTrigger id="country" className="h-12 bg-white border-gray-200 rounded-xl px-4 shadow-sm focus:ring-amber-500">
              <SelectValue placeholder={t('selectCountry')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
              <SelectItem value="eg">مصر</SelectItem>
              <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="sr-only">{t('gender')}</Label>
          <Select defaultValue="male">
            <SelectTrigger id="gender" className="h-12 bg-white border-gray-200 rounded-xl px-4 shadow-sm focus:ring-amber-500">
              <SelectValue placeholder={t('selectGender')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t('male')}</SelectItem>
              <SelectItem value="female">{t('female')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Change Password */}
        <div className="flex justify-end">
          <Link href="#" className="text-sm text-[#1a2754] hover:text-[#1a2754]/80 font-medium hover:underline transition-colors">
            {t('changePassword')}
          </Link>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="button" className="w-full h-14 rounded-xl text-lg font-bold bg-[#1a2754] hover:bg-[#1a2754]/90 text-white shadow-md hover:shadow-lg transition-all">
            {t('save')}
          </Button>
        </div>
      </form>
    </div>
  );
}
