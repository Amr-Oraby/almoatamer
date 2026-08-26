import { apiClient } from "@/lib/api/client";
import { 
    StandardPriceResponse, 
    TimingWebResponse, 
    StatusesResponse, 
    LangsResponse, 
    RelativesResponse,
    CreateBookingPayload 
} from "@/app/types/booking";

export const getStandardPrice = (month?: number, day?: number) => {
    let url = "/api/standard-umrah-price";
    if (month && day) {
        url += `?month=${month}&day=${day}`;
    }
    return apiClient<StandardPriceResponse>(url, { method: "GET" });
}

export const getTimingWeb = () => {
    return apiClient<TimingWebResponse>("/api/timing-web", { method: "GET" });
}

export const getStatuses = () => {
    return apiClient<StatusesResponse>("/api/statuses-with-no-pag", { method: "GET" });
}

export const getLangs = () => {
    return apiClient<LangsResponse>("/api/langs-with-no-pag", { method: "GET" });
}

export const getRelatives = () => {
    return apiClient<RelativesResponse>("/api/relatives-with-no-pag", { method: "GET" });
}

export const createBooking = async (payload: CreateBookingPayload) => {
    return apiClient<any>(`/api/make-umrah`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
