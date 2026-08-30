"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfirmPayment } from "@/features/payment/hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentResultClientProps {
    umrahId: string;
}

export default function PaymentResultClient({ umrahId }: PaymentResultClientProps) {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");
    const router = useRouter();
    const locale = useLocale();
    const queryClient = useQueryClient();
    const { mutate: confirmPayment } = useConfirmPayment();
    
    const [pageStatus, setPageStatus] = useState<"loading" | "success" | "failed">("loading");

    useEffect(() => {
        if (!status || !umrahId) {
            router.push(`/${locale}/orders`);
            return;
        }

        if (status === 'success') {
            confirmPayment({ transaction_id: "1", umrah_id: umrahId }, {
                onSuccess: (res: any) => {
                    if (res?.status === "fail") {
                        toast.error(res.message || "فشلت عملية تأكيد الدفع");
                        setPageStatus("failed");
                        return;
                    }
                    toast.success(res?.message || "تم إرسال دفعتك بنجاح");
                    queryClient.invalidateQueries({ queryKey: ["orders"] });
                    queryClient.invalidateQueries({ queryKey: ["order", umrahId] });
                    setPageStatus("success");
                    
                    // Redirect to orders after 2 seconds
                    setTimeout(() => {
                        router.push(`/${locale}/orders`);
                    }, 2000);
                },
                onError: (error: any) => {
                    toast.error(error.message || "Failed to confirm payment");
                    setPageStatus("failed");
                }
            });
        } else {
            setPageStatus("failed");
        }
    }, [status, umrahId, confirmPayment, locale, router, queryClient]);

    const isRtl = locale === 'ar';
    const successTitle = isRtl ? "تمت عملية الدفع بنجاح" : "Payment Successful";
    const failedTitle = isRtl ? "فشلت عملية الدفع" : "Payment Failed";
    const processingText = isRtl ? "جاري معالجة الدفع..." : "Processing payment...";
    const returnToOrders = isRtl ? "العودة للطلبات" : "Return to Orders";

    if (pageStatus === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <Loader2 className="w-12 h-12 text-[#1a2754] animate-spin" />
                <p className="text-lg font-medium text-gray-700">{processingText}</p>
            </div>
        );
    }

    if (pageStatus === "success") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <h1 className="text-2xl font-bold text-gray-900">{successTitle}</h1>
                <Button onClick={() => router.push(`/${locale}/orders`)} className="bg-[#1a2754] hover:bg-[#1a2754]/90 text-white rounded-xl h-12 px-8">
                    {returnToOrders}
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
            <XCircle className="w-20 h-20 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{failedTitle}</h1>
            <div className="flex gap-4">
                <Button onClick={() => router.push(`/${locale}/orders`)} variant="outline" className="rounded-xl h-12 px-8">
                    {returnToOrders}
                </Button>
            </div>
        </div>
    );
}
