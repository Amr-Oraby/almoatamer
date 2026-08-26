import { apiClient } from "@/lib/api/client";
import { ProfileResponse } from "@/app/types/UserType";

export const getProfile = () => apiClient<ProfileResponse>("/api/profile", { method: "GET" });

export const updateProfile = (data: FormData) =>
    apiClient<ProfileResponse>("/api/profile", {
        method: "POST",
        body: data,
    });

// export const changePassword = (data: ChangePasswordPayload) =>
//     apiClient<ApiResponse<any>>("/api/profile/change-password", {
//         method: "POST",
//         body: JSON.stringify(data),
//     });

// export const updateSettings = (data: UpdateSettingsPayload) =>
//     apiClient<ApiResponse<any>>("/api/profile/settings", {
//         method: "POST",
//         body: JSON.stringify(data),
//     }); 