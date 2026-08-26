"use client";

import { useTranslations } from "next-intl";
import { useDeleteOrder } from "../hooks";
import { useRouter } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface OrderDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export default function OrderDeleteModal({ isOpen, onClose, orderId }: OrderDeleteModalProps) {
    const t = useTranslations("OrderDelete");
    const router = useRouter();
    const { mutate, isPending } = useDeleteOrder(orderId);

    const handleDelete = () => {
        mutate(undefined, {
            onSuccess: () => {
                onClose();
                router.push("/orders");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-md p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-xl">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold text-gray-900 text-center">{t("title")}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-gray-600 mb-8 text-base">
                    {t("description")}
                </DialogDescription>

                <div className="flex gap-4">
                    <button 
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {t("cancel")}
                    </button>
                    <button 
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
                    >
                        {isPending ? t("deleting") : t("confirm")}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
