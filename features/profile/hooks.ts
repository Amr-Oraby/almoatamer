import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "./api";
import { toast } from "sonner";
// import { getProfile, updateProfile, changePassword, updateSettings } from "./api";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(),
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => updateProfile(data),
        onMutate: () => {
            toast.loading("...", { id: "update-profile-toast" });
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!", { id: "update-profile-toast" });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update profile", { id: "update-profile-toast" });
        },
    });
}

// export function useChangePassword() {
//     return useMutation({
//         mutationFn: (data: ChangePasswordPayload) => changePassword(data),
//         onMutate: () => {
//             toast.loading("...", { id: "change-password-toast" });
//         },
//         onSuccess: () => {
//             toast.success("Password updated successfully!", { id: "change-password-toast" });
//         },
//         onError: (error: any) => {
//             toast.error(error.message || "Failed to update password", { id: "change-password-toast" });
//         },
//     });
// }

// export function useUpdateSettings() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (data: UpdateSettingsPayload) => updateSettings(data),
//         onMutate: () => {
//             toast.loading("...", { id: "update-settings-toast" });
//         },
//         onSuccess: () => {
//             toast.success("Settings updated successfully!", { id: "update-settings-toast" });
//             queryClient.invalidateQueries({ queryKey: ["profile"] });
//         },
//         onError: (error: any) => {
//             toast.error(error.message || "Failed to update settings", { id: "update-settings-toast" });
//         },
//     });
// }