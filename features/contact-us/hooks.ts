import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/toast';
import { useLocale, useTranslations } from 'next-intl';
import { api, ContactFormValues } from './api';

const useContactUs = () => {
  const t = useTranslations('Contact');
  const locale = useLocale();

  const form = useForm<ContactFormValues>({
    defaultValues: {
      phone_code: "20",
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => api.submitContactForm(data, locale),
    onSuccess: (data: any) => {
      toast.success(t('successTitle'), {
        description: data.message || t('successMessage'),
      });
      form.reset();
    },
    onError: (error: any) => {
      toast.error(t('errorTitle'), {
        description: t('errorMessage'),
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return {
    form,
    mutation,
    onSubmit,
    t
  };
};

export const hooks = {
  useContactUs,
};
