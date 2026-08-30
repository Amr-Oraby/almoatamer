import { apiClient } from "@/lib/api/client";

export const prePayWeb = (umrahId: string) => {
    return apiClient<any>(`/api/pre-pay-web/${umrahId}`, { method: "GET" });
}

export const postPay = (payload: { transaction_id: string; umrah_id: string }) => {
    return apiClient<any>(`/api/pay`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
