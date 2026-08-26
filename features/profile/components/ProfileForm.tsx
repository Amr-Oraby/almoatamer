'use client';

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
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { Loader2, Edit2 } from 'lucide-react';
import { useUpdateProfile, useProfile } from '@/features/profile/hooks';
import { useCountries } from '@/features/countries/hooks';

export default function ProfileForm() {
  const t = useTranslations('Profile.personalDetails');
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data: profileResponse, isLoading } = useProfile();
  const profile = profileResponse?.data;
  const { data: countriesResponse, isLoading: isCountriesLoading } = useCountries();
  const countries = countriesResponse?.data;
  // Normalize gender to standard English keys since API returns translated strings
  let normalizedGender = 'male';
  if (profile?.gender) {
    const g = profile.gender.trim().toLowerCase();
    if (g === 'female' || g === 'انثي' || g === 'أنثى' || g === 'انثى') {
      normalizedGender = 'female';
    } else if (g === 'male' || g === 'ذكر') {
      normalizedGender = 'male';
    }
  }

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile?.image) {
      setImagePreview(profile.image);
    }
  }, [profile?.image]);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    values: {
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      phone_code: profile?.phone_code?.toString() || '20',
      country_id: profile?.country?.id?.toString() || '1',
      gender: normalizedGender,
    }
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('phone_code', data.phone_code);
    formData.append('country_id', data.country_id);
    formData.append('gender', data.gender);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    updateProfile(formData);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

      {/* Profile Image */}
      <div className="flex flex-col items-center justify-center mb-6 md:mb-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-md bg-gray-100 flex items-center justify-center">
            {imagePreview ? (
              <Image src={imagePreview} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm font-medium">{t('noImage') || 'No image'}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-amber-500 text-white p-2.5 rounded-full shadow-lg hover:bg-amber-600 transition-colors border-2 border-white"
          >
            <Edit2 size={16} />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }}
        />
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700 font-bold flex justify-start">
          <span className="text-red-500 mx-1">*</span> {t('fullName')}
        </Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="h-12 bg-white border-gray-200 px-4 rounded-xl shadow-sm focus-visible:ring-amber-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
      </div>

      {/* Mobile Number */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700 font-bold flex justify-start">
          <span className="text-red-500 mx-1">*</span> {t('mobileNumber')}
        </Label>
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition-all" dir="ltr">
          <Input
            id="phone"
            placeholder={t('enterMobile')}
            {...register('phone', { required: 'Phone is required' })}
            className="h-12 border-0 shadow-none bg-transparent px-4 focus-visible:ring-0 flex-1 min-w-0"
          />
          <div className="flex items-center border-l border-gray-200 px-2 bg-gray-50 w-28 shrink-0">
            <Controller
              name="phone_code"
              control={control}
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="border-0 shadow-none focus:ring-0 px-2 gap-2 w-full h-11 bg-transparent hover:bg-gray-100 transition-colors rounded-none">
                    <div className="flex items-center gap-2 w-full justify-center">
                      {isCountriesLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      ) : (
                        <span className="text-sm font-medium">+{field.value}</span>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {countries?.map((country: any) => (
                      <SelectItem key={country.id} value={country.code?.toString()}>
                        +{country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="sr-only">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
          })}
          className="h-12 bg-white border-gray-200 px-4 rounded-xl shadow-sm focus-visible:ring-amber-500"
          dir="ltr"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country_id" className="sr-only">{t('country')}</Label>
        <Controller
          name="country_id"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="country_id" className="h-12 w-full bg-white border-gray-200 rounded-xl !px-4 shadow-sm focus:ring-amber-500">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder={t('selectCountry')}>
                    {countries?.find((c) => c.id.toString() === field.value)?.name}
                  </SelectValue>
                  {isCountriesLoading && <Loader2 className="h-4 w-4 animate-spin text-gray-500 mr-2" />}
                </div>
              </SelectTrigger>
              <SelectContent>
                {countries?.map((country: any) => (
                  <SelectItem key={country.id} value={country.id?.toString()}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.country_id && <p className="text-red-500 text-sm">{errors.country_id.message as string}</p>}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label htmlFor="gender" className="sr-only">{t('gender')}</Label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="gender" className="h-12 w-full bg-white border-gray-200 rounded-xl !px-4 shadow-sm focus:ring-amber-500">
                <SelectValue placeholder={t('selectGender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('male')}</SelectItem>
                <SelectItem value="female">{t('female')}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message as string}</p>}
      </div>

      {/* Change Password */}
      <div className="flex justify-end pt-2">
        <Link href="#" className="text-sm text-[#1a2754] hover:text-[#1a2754]/80 font-medium hover:underline transition-colors">
          {t('changePassword')}
        </Link>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button type="submit" disabled={isPending} className="w-full h-14 rounded-xl text-lg font-bold bg-[#1a2754] hover:bg-[#1a2754]/90 text-white shadow-md hover:shadow-lg transition-all">
          {isPending ? '...' : t('save')}
        </Button>
      </div>
    </form>
  );
}
