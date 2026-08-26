'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useVerify, useResendCode } from '../hooks';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  
  const verifyMutation = useVerify();
  const resendMutation = useResendCode();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('يجب إدخال رمز التحقق بالكامل');
      return;
    }
    setError('');
    
    verifyMutation.mutate({ email, otp });
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    resendMutation.mutate(email, {
      onSuccess: () => {
        setTimeLeft(30);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4 text-center sm:text-start lg:rtl:text-right lg:ltr:text-left flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2754] w-full text-center">
          التحقق من كود
        </h1>
        <p className="text-muted-foreground text-center text-sm leading-relaxed max-w-[300px]">
          لقد أرسلنا رمز تحقق مكونًا من 4 أرقام إلى البريد الإلكتروني المسجل <strong className="text-[#1a2754] block mt-1" dir="ltr">{email}</strong>
        </p>
        <p className="text-muted-foreground text-center text-sm">
          أدخل الرمز في المربع أدناه للمتابعة.
        </p>
        
        <Link 
          href="/auth/forget-password" 
          className="text-[#16279f] text-sm font-semibold hover:underline mt-2 inline-block"
        >
          تعديل البريد الإلكتروني؟
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">
        
        <div className="space-y-2 flex flex-col items-center w-full" dir="ltr">
          <InputOTP 
            maxLength={4} 
            value={otp} 
            onChange={setOtp}
          >
            <InputOTPGroup className="gap-4">
              <InputOTPSlot index={0} className="w-16 h-16 text-2xl rounded-xl border border-input/60 shadow-sm bg-white" />
              <InputOTPSlot index={1} className="w-16 h-16 text-2xl rounded-xl border border-input/60 shadow-sm bg-white" />
              <InputOTPSlot index={2} className="w-16 h-16 text-2xl rounded-xl border border-input/60 shadow-sm bg-white" />
              <InputOTPSlot index={3} className="w-16 h-16 text-2xl rounded-xl border border-input/60 shadow-sm bg-white" />
            </InputOTPGroup>
          </InputOTP>
          
          {error && (
            <p className="text-sm text-red-500 mt-2 text-center w-full" dir="rtl">{error}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-between text-sm w-full max-w-[300px]">
          <div>
            <span className="text-muted-foreground">ألم تتلق رمزًا؟ </span>
            <button 
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || resendMutation.isPending}
              className={`font-semibold ${timeLeft > 0 || resendMutation.isPending ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 'text-[#16279f] hover:underline'}`}
            >
              إعادة إرسال
            </button>
          </div>
          <span className="text-muted-foreground font-medium" dir="ltr">
            00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>

        <Button 
          type="submit" 
          disabled={verifyMutation.isPending || otp.length < 4}
          className="w-full max-w-[300px] bg-[#16279f] text-white hover:bg-[#16279f]/90 h-14 rounded-xl text-lg font-semibold transition-all"
        >
          {verifyMutation.isPending ? 'جاري التحقق...' : 'التالي'}
        </Button>
      </form>
    </div>
  );
}
