import { useMutation } from "@tanstack/react-query";
import { prePayWeb, postPay } from "./api";
import { toast } from "sonner";

export function usePrePayWeb() {
    return useMutation({
        mutationFn: (umrahId: string) => prePayWeb(umrahId),
        onError: (error: any) => {
            toast.error(error.message || "Failed to initialize payment");
        },
    });
}

export function useConfirmPayment() {
    return useMutation({
        mutationFn: (payload: { transaction_id: string; umrah_id: string }) => postPay(payload),
    });
}
