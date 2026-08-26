'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCodeSelect } from '@/components/PhoneCodeSelect';
import { Link } from '@/i18n/routing';
import { useRegister } from '../hooks';
import { toast } from '@/components/ui/toast';

type RegisterFormValues = {
  name: string;
  phone_code: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export default function RegisterForm() {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      phone_code: '20',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const phoneCode = watch('phone_code');
  const termsAccepted = watch('termsAccepted');
  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t('registerError') || "Passwords do not match");
      return;
    }
    
    registerMutation.mutate({
      name: data.name,
      phone_code: data.phone_code,
      phone: data.phone,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      accept_terms: data.termsAccepted ? 1 : 0
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center sm:text-start lg:rtl:text-right lg:ltr:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2754]">
          {t('welcomeBack') || 'Welcome back'} 
          {/* Note: The screenshot uses "أهلاً بك من جديد" which maps to welcomeBack in existing translations.
              If it should strictly be "Create New Account", use t('registerNow') instead, but matching the screenshot text. */}
        </h1>
        <p className="text-muted-foreground">
          {t('enterDetailsToRegister')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          
          {/* Name Input */}
          <div className="relative h-[52px]">
            <Input
              type="text"
              placeholder={t('enterName')}
              className="w-full h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary text-base"
              {...register('name', { required: true })}
            />
          </div>

          {/* Phone Input with Code */}
          <div className="flex items-stretch gap-3 h-[52px]">
            <div className="w-[100px] h-full flex-shrink-0">
              <PhoneCodeSelect
                value={phoneCode ?? "20"}
                onChange={(value) => setValue('phone_code', value)}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="flex-1 relative h-full">
              <Input
                type="tel"
                placeholder={t('enterPhone')}
                className="w-full h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary text-base"
                {...register('phone', { required: true })}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative h-[52px]">
            <Input
              type="email"
              placeholder={t('enterEmail')}
              className="w-full h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary text-base"
              {...register('email', { required: true })}
            />
          </div>

          {/* Password Input */}
          <div className="relative h-[52px]">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('enterPassword')}
              className="w-full h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary ltr:pr-10 rtl:pl-10 text-base"
              {...register('password', { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative h-[52px]">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('confirmPassword')}
              className="w-full h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary ltr:pr-10 rtl:pl-10 text-base"
              {...register('confirmPassword', { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-3 pt-2 lg:rtl:justify-start">
            <input 
              type="checkbox" 
              id="terms" 
              className="w-5 h-5 rounded-full border-gray-300 text-primary focus:ring-primary"
              {...register('termsAccepted', { required: true })}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer select-none">
              {t('acceptTerms')}
            </label>
          </div>

        </div>

        <Button 
          type="submit" 
          disabled={!termsAccepted || registerMutation.isPending}
          className="w-full bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? '...' : t('registerNow')}
        </Button>
      </form>

      <div className="text-center text-sm font-medium">
        <span className="text-muted-foreground">{t('alreadyHaveAccount')} </span>
        <Link href="/auth/login" className="text-[#16279f] font-semibold hover:underline">
          {t('loginButton')}
        </Link>
      </div>
      
    </div>
  );
}
