'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '../hooks';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';

type ResetPasswordValues = {
  password: string;
  password_confirmation: string;
};

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordValues>({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const resetMutation = useResetPassword();

  const onSubmit = (data: ResetPasswordValues) => {
    resetMutation.mutate({
      email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center sm:text-start lg:rtl:text-right lg:ltr:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2754]">
          إعادة تعيين كلمة المرور
        </h1>
        <p className="text-muted-foreground">
          الرجاء إدخال كلمة المرور الجديدة
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          
          <div className="relative h-[52px]">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور الجديدة"
              className={`h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary pr-10 text-base ${errors.password ? 'border-red-500' : ''}`}
              {...register('password', { 
                required: 'كلمة المرور مطلوبة',
                minLength: { value: 6, message: 'يجب أن تتكون من 6 أحرف على الأقل' }
              })}
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
          {errors.password && (
            <p className="text-sm text-red-500 mt-1 rtl:text-right">{errors.password.message}</p>
          )}

          <div className="relative h-[52px]">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="تأكيد كلمة المرور"
              className={`h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary pr-10 text-base ${errors.password_confirmation ? 'border-red-500' : ''}`}
              {...register('password_confirmation', { 
                required: 'تأكيد كلمة المرور مطلوب',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'كلمات المرور غير متطابقة';
                  }
                },
              })}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-sm text-red-500 mt-1 rtl:text-right">{errors.password_confirmation.message}</p>
          )}

        </div>

        <Button 
          type="submit" 
          disabled={resetMutation.isPending}
          className="w-full bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all"
        >
          {resetMutation.isPending ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <Link href="/auth/login" className="text-[#16279f] font-semibold hover:underline">
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
