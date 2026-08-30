"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { usePrePayWeb } from "@/features/payment/hooks";
import { toast } from "sonner";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onInstapayClick: () => void;
}

export default function PaymentMethodModal({ isOpen, onClose, orderId, onInstapayClick }: PaymentMethodModalProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const title = isRtl ? "طرق الدفع" : "Payment Methods";
  const description = isRtl ? "اختر طريقة الدفع المناسبة لك" : "Choose the suitable payment method for you";

  const onlineText = isRtl ? "دفع أونلاين" : "Online Payment";
  const instapayText = isRtl ? "دفع عبر انستاباي" : "Pay via Instapay";

  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const { mutate: getPrePayLink, isPending } = usePrePayWeb();

  const handleOnlinePayment = () => {
    getPrePayLink(orderId, {
      onSuccess: (res: any) => {
        if (res?.data) {
          window.location.href = res.data; // the link of myfatoorah
        } else {
          toast.error(res?.message || "Failed to get payment link");
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-8 rounded-3xl bg-white shadow-2xl border-0">
        <DialogHeader className="mb-8 flex flex-col items-center gap-2">
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#1a2754]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-muted-foreground text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={handleOnlinePayment}
            disabled={isPending}
            className="group relative w-full flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#1a2754] to-[#121c3b] text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isPending && <Loader2 className="animate-spin mr-2" />}
            <span className="font-bold text-lg sm:text-xl tracking-wide">{onlineText}</span>
          </button>

          <button
            onClick={onInstapayClick}
            className="group relative w-full flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#1a2754] to-[#121c3b] text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="font-bold text-lg sm:text-xl tracking-wide">{instapayText}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
