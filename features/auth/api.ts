import { apiClient } from "@/lib/api/client";


export const logout = () => apiClient("/api/auth/logout", { method: "POST" });

export const login = (credentials: {
    phone_code: string;
    phone: string;
    password: string;
}) => apiClient("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });