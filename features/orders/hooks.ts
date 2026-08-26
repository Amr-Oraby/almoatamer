import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, getOrder, updateOrder, deleteOrder, cancelOrder, applyCoupon } from "./api";
import { toast } from "sonner";

export function useOrders(page: number = 1, status?: string) {
    return useQuery({
        queryKey: ["orders", page, status],
        queryFn: () => getOrders(page, status),
    });
}

export function useOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrder(id),
        enabled: !!id,
    });
}

export function useUpdateOrder(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            return updateOrder(payload, id);
        },
        onSuccess: (data: any) => {
            if (data?.status === "fail") {
                toast.error(data.message || "Failed to update order");
                return;
            }
            toast.success(data?.message || "Order updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update order");
        },
    });
}

export function useDeleteOrder(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return deleteOrder(id);
        },
        onSuccess: (data: any) => {
            if (data?.status === "fail") {
                toast.error(data.message || "Failed to delete order");
                return;
            }
            toast.success(data?.message || "Order deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete order");
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: { umrah_id: string; reason_id: number }) => {
            return cancelOrder(payload);
        },
        onSuccess: (data: any, variables: any) => {
            if (data?.status === "fail") {
                toast.error(data.message || "Failed to cancel order");
                return;
            }
            toast.success(data?.message || "Order canceled successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", variables.umrah_id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to cancel order");
        },
    });
}

export function useApplyCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: { umrah_id: string; code: string }) => {
            return applyCoupon(payload);
        },
        onSuccess: (data: any, variables: any) => {
            // Check if backend returned a fail status inside the 200 response
            if (data?.status === "fail") {
                toast.error(data.message || "Invalid coupon");
                return;
            }
            toast.success(data.message || "Coupon applied successfully!");
            queryClient.invalidateQueries({ queryKey: ["order", variables.umrah_id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to apply coupon");
        },
    });
}

 