"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCancelOrder } from "../hooks";
import { useRouter } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface OrderCancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export default function OrderCancelModal({ isOpen, onClose, orderId }: OrderCancelModalProps) {
    const t = useTranslations("OrderCancel");
    const router = useRouter();
    const { mutate, isPending } = useCancelOrder();
    
    // Default reason to "1" (Dead) or "2" (Sick) as per user instructions
    const [reasonId, setReasonId] = useState("1");

    const handleCancel = () => {
        mutate({ umrah_id: orderId, reason_id: parseInt(reasonId, 10) }, {
            onSuccess: () => {
                onClose();
                // Optionally redirect to orders list, or just stay on the page
                // The order details will update because query is invalidated
                router.push("/orders");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-md p-6 sm:p-8 bg-[#f8f9fc] rounded-2xl border-none shadow-2xl">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-black text-[#1a2754] text-center">{t("title")}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-gray-500 mb-6 text-base font-medium">
                    {t("description")}
                </DialogDescription>

                <div className="flex flex-col gap-6">
                    <select 
                        value={reasonId} 
                        onChange={e => setReasonId(e.target.value)}
                        className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none text-gray-900 font-medium focus:ring-1 focus:ring-[#1a2754] focus:border-[#1a2754] appearance-none cursor-pointer"
                        dir="rtl"
                    >
                        <option value="" disabled hidden>{t("selectReason")}</option>
                        <option value="1">{t("dead")}</option>
                        <option value="2">{t("sick")}</option>
                    </select>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleCancel}
                            disabled={isPending}
                            className="flex-1 py-4 bg-white border border-red-200 text-red-500 font-bold text-lg rounded-xl shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                            {isPending ? t("canceling") : t("cancelUmrahBtn")}
                        </button>
                        <button 
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 py-4 bg-[#1a2754] text-white font-bold text-lg rounded-xl shadow-sm hover:bg-[#121c3b] transition-colors disabled:opacity-50"
                        >
                            {t("backBtn")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
