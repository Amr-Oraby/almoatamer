import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, deleteAccount, register, forgetPassword, verify, resetPassword, resendCode } from "./api";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "@/components/ui/toast";

export function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const t = useTranslations("Auth");
    const locale = useLocale()

    return useMutation({
        mutationFn: login,
        onMutate: () => {
            toast.loading("...", { id: "login-toast" });
        },
        onSuccess: (data) => {

            toast.success(t("loginSuccess"), { id: "login-toast" });
            // Use hard redirect on login to ensure the entire app (including Providers and Server Components)
            // initializes cleanly with the new session cookie and fetches the correct profile permissions.
            window.location.href = `/${locale}`;
        },
        onError: (error: Error) => {
            toast.error(error.message || t("loginError"), { id: "login-toast" });
        }
    });
}

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const t = useTranslations("Auth");
    const locale = useLocale()
    return useMutation({
        mutationFn: () => logout(),
        onMutate: () => {
            toast.loading("...", { id: "logout-toast" });
        },
        onSuccess: () => {
            toast.success(t("logoutSuccess"), { id: "logout-toast" });
            // Use hard redirect to completely clear React Query state and prevent 
            // active queries from refetching (and triggering 401 errors) during transition.
            window.location.href = `/${locale}/auth`;
        },
        onError: () => {
            toast.dismiss("logout-toast");
        }
    });
}

export function useDeleteAccount() {
    const router = useRouter();
    const t = useTranslations("Auth");

    return useMutation({
        mutationFn: () => deleteAccount(),
        onMutate: () => {
            toast.loading("...", { id: "delete-account-toast" });
        },
        onSuccess: () => {
            // Using a fallback if translation is missing since I don't know if it exists
            toast.success(t("deleteAccountSuccess") || "Account deleted successfully", { id: "delete-account-toast" });
            router.push("/");
            router.refresh();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete account", { id: "delete-account-toast" });
        },
        onSettled: () => {
            toast.dismiss("delete-account-toast");
        },
    });
}

export function useRegister() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const t = useTranslations("Auth");
    const locale = useLocale()

    return useMutation({
        mutationFn: register,
        onMutate: () => {
            toast.loading("...", { id: "register-toast" });
        },
        onSuccess: (data) => {

            toast.success(t("registerSuccess"), { id: "register-toast" });
            // Use hard redirect on login to ensure the entire app (including Providers and Server Components)
            // initializes cleanly with the new session cookie and fetches the correct profile permissions.
            window.location.href = `/${locale}`;
        },
        onError: (error: Error) => {
            toast.error(error.message || t("registerError"), { id: "register-toast" });
        }
    });
}

export function useForgetPassword() {
    const router = useRouter();
    const locale = useLocale();

    return useMutation({
        mutationFn: (email: string) => forgetPassword(email),
        onSuccess: (response: any, variables: string) => {
            if (response?.status === "success") {
                toast.success(response.message || "Password reset link sent to your email", { id: "forget-password-toast" });
                router.push(`/auth/verify?email=${variables}`);
            } else {
                toast.error(response?.message || "Failed to send reset link", { id: "forget-password-toast" });
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An error occurred", { id: "forget-password-toast" });
        }
    });
}

export function useVerify() {
    const router = useRouter();
    const locale = useLocale();

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => verify(data),
        onSuccess: (response: any, variables: { email: string, otp: string }) => {
            if (response?.status === "success") {
                toast.success(response.message || "OTP verified successfully", { id: "verify-toast" });
                router.push(`/auth/reset-password?email=${variables.email}`);
            } else {
                toast.error(response?.message || "Verification failed", { id: "verify-toast" });
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An error occurred during verification", { id: "verify-toast" });
        }
    });
}

export function useResetPassword() {
    const locale = useLocale();

    return useMutation({
        mutationFn: (data: { email: string, password: string, password_confirmation: string }) => resetPassword(data),
        onSuccess: (response: any) => {
            if (response?.status === "success") {
                toast.success(response.message || "Password reset successfully", { id: "reset-password-toast" });
                // Use hard redirect to ensure the entire app initializes cleanly with the new session cookie.
                window.location.href = `/${locale}`;
            } else {
                toast.error(response?.message || "Password reset failed", { id: "reset-password-toast" });
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An error occurred during password reset", { id: "reset-password-toast" });
        }
    });
}

export function useResendCode() {
    return useMutation({
        mutationFn: (email: string) => resendCode(email),
        onSuccess: (response: any) => {
            if (response?.status === "success") {
                toast.success(response.message || "Code resent successfully", { id: "resend-toast" });
            } else {
                toast.error(response?.message || "Failed to resend code", { id: "resend-toast" });
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An error occurred", { id: "resend-toast" });
        }
    });
}