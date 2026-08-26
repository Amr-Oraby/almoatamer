'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForgetPassword } from '../hooks';
import { Link } from '@/i18n/routing';
import { Mail } from 'lucide-react';

type ForgetPasswordValues = {
  email: string;
};

export default function ForgetPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordValues>({
    defaultValues: {
      email: '',
    },
  });

  const forgetPasswordMutation = useForgetPassword();

  const onSubmit = (data: ForgetPasswordValues) => {
    forgetPasswordMutation.mutate(data.email);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center sm:text-start lg:rtl:text-right lg:ltr:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2754]">
          نسيت كلمة المرور
        </h1>
        <p className="text-muted-foreground">
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          
          <div className="relative h-[52px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
              <Mail size={20} />
            </div>
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              className={`h-full bg-white rounded-xl border-input/60 focus-visible:ring-primary pl-10 pr-4 text-base ${errors.email ? 'border-red-500' : ''}`}
              {...register('email', { 
                required: 'البريد الإلكتروني مطلوب',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'بريد إلكتروني غير صالح'
                }
              })}
              dir="ltr"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1 rtl:text-right">{errors.email.message}</p>
          )}

        </div>

        <Button 
          type="submit" 
          disabled={forgetPasswordMutation.isPending}
          className="w-full bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all"
        >
          {forgetPasswordMutation.isPending ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">تذكرت كلمة المرور؟ </span>
        <Link href="/auth/login" className="text-[#16279f] font-semibold hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
