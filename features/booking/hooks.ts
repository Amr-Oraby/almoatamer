import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
    getStandardPrice, 
    getTimingWeb, 
    getStatuses, 
    getLangs, 
    getRelatives, 
    createBooking,
    uploadUmrahInstapay
} from "./api";
import { CreateBookingPayload } from "@/app/types/booking";

export function useStandardPrice(month?: number, day?: number) {
    return useQuery({
        queryKey: ["standardPrice", month, day],
        queryFn: () => getStandardPrice(month, day),
    });
}

export function useTimingWeb() {
    return useQuery({
        queryKey: ["timingWeb"],
        queryFn: getTimingWeb,
    });
}

export function useStatuses() {
    return useQuery({
        queryKey: ["statuses"],
        queryFn: getStatuses,
    });
}

export function useLangs() {
    return useQuery({
        queryKey: ["langs"],
        queryFn: getLangs,
    });
}

export function useRelatives() {
    return useQuery({
        queryKey: ["relatives"],
        queryFn: getRelatives,
    });
}

export function useCreateBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateBookingPayload) => {
            return createBooking(payload);
        },
        onSuccess: (data: any) => {
            if (data?.status === "fail") {
                toast.error(data.message || "Failed to create booking");
                return;
            }
            toast.success(data?.message || "Booking created successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create booking");
        },
    });
}

export function useUploadUmrahInstapay() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            return uploadUmrahInstapay(formData);
        },
        onSuccess: (data: any) => {
            if (data?.status === "fail") {
                toast.error(data.message || "Failed to upload image");
                return;
            }
            toast.success(data?.message || "Image uploaded successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to upload image");
        },
    });
}
