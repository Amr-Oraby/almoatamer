'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLogin } from '../hooks';
import { Link } from '@/i18n/routing';
import { FaApple, FaGoogle, FaFacebookF } from 'react-icons/fa';

type LoginFormValues = {
  phone_code: string;
  phone: string;
  password: string;
};

export default function LoginForm() {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      phone_code: '20',
      phone: '',
      password: '',
    },
  });

  const phoneCode = watch('phone_code');
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center sm:text-start lg:rtl:text-right lg:ltr:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2754]">
          {t('welcomeBack')}
        </h1>
        <p className="text-muted-foreground">
          {t('enterPhoneToSignIn')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-row items-stretch gap-2 h-[52px]">
            <div className="w-[100px] h-full flex-shrink-0">
              <Select
                value={phoneCode ?? "20"}
                onValueChange={(value) => setValue('phone_code', value || '20')}
              >
                <SelectTrigger className="h-full bg-white rounded-xl border-input/60 focus:ring-primary" dir="ltr">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent dir="ltr">
                  <SelectItem value="20">
                    <span className="flex items-center gap-2">
                      <span>🇪🇬</span> +20
                    </span>
                  </SelectItem>
                  <SelectItem value="966">
                    <span className="flex items-center gap-2">
                      <span>🇸🇦</span> +966
                    </span>
                  </SelectItem>
                  <SelectItem value="971">
                    <span className="flex items-center gap-2">
                      <span>🇦🇪</span> +971
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 relative h-full">
              <Input
                type="tel"
                placeholder={t('enterPhone')}
                className="h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary text-base"
                {...register('phone', { required: true })}
                dir="ltr"
              />
            </div>
          </div>

          <div className="relative h-[52px]">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('enterPassword')}
              className="h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary pr-10 text-base"
              {...register('password', { required: true })}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="flex justify-start">
            <Link 
              href="#" 
              className="text-primary text-sm font-semibold hover:underline"
            >
              {t('forgetPassword')}
            </Link>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loginMutation.isPending}
          className="w-full bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all"
        >
          {loginMutation.isPending ? '...' : t('loginButton')}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">{t('dontHaveAccount')} </span>
        <Link href="#" className="text-[#16279f] font-semibold hover:underline">
          {t('registerNow')}
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            {t('orSignInWith')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" className="h-14 rounded-xl border-input/60 hover:bg-muted/50 bg-white shadow-sm">
          <FaApple size={24} className="text-black" />
        </Button>
        <Button variant="outline" className="h-14 rounded-xl border-input/60 hover:bg-muted/50 bg-white shadow-sm">
          <FaGoogle size={22} />
        </Button>
        <Button variant="outline" className="h-14 rounded-xl border-input/60 hover:bg-muted/50 bg-white shadow-sm">
          <FaFacebookF size={22} className="text-[#1877F2]" />
        </Button>
      </div>
    </div>
  );
}
