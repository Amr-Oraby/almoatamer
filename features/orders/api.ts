import { apiClient } from "@/lib/api/client";
import { OrdersResponse, OrderResponse } from "./types";

export const getOrders = (page: number = 1, status?: string) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (status) {
        params.set("status", status);
    }

    return apiClient<OrdersResponse>(`/api/umrahs?${params.toString()}`, { method: "GET" });
}

export const getOrder = (id: string) => {
    return apiClient<OrderResponse>(`/api/umrah/${id}`, { method: "GET" });
}

export const updateOrder = async (data: any, id: string) => {
    return apiClient<any>(`/api/update-umrah/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const deleteOrder = async (id: string) => {
    return apiClient(`/api/umrah/${id}`, { method: "DELETE" });
}

export const cancelOrder = async (payload: { umrah_id: string; reason_id: number }) => {
    return apiClient<any>(`/api/cancel-umrah`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export const applyCoupon = async (payload: { umrah_id: string; code: string }) => {
    return apiClient<any>(`/api/apply-coupon-to-umrah`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
