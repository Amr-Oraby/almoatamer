import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./api";
import { useRouter } from "next/navigation";
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
            window.location.href = `/${locale}/login`;
        },
        onError: () => {
            toast.dismiss("logout-toast");
        }
    });
}