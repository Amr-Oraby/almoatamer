'use client';

import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCountries } from '@/features/countries/hooks';

interface PhoneCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PhoneCodeSelect({ value, onChange, disabled }: PhoneCodeSelectProps) {
  const { data: countriesResponse, isLoading: isLoadingCountries } = useCountries();
  const countries = countriesResponse?.data || [];

  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val || '')}
      disabled={disabled || isLoadingCountries}
    >
      <SelectTrigger className="w-full !h-full bg-white rounded-xl border-input/60 focus:ring-primary px-4 text-base" dir="ltr">
        {isLoadingCountries ? (
          <div className="flex items-center justify-center w-full">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <SelectValue placeholder="Code" />
        )}
      </SelectTrigger>
      <SelectContent dir="ltr">
        {countries.map((country: any) => (
          <SelectItem key={country.id} value={country.code}>
            <span className="flex items-center justify-center w-full">
              <span dir="ltr">+{country.code}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
