import { apiClient } from "@/lib/api/client";

export const logout = () => apiClient("/api/auth/logout", { method: "POST" });

export const login = (credentials: {
    phone_code: string;
    phone: string;
    password: string;
}) => apiClient("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });

export const register = (credentials: {
    name: string,
    phone_code: string,
    phone: string,
    email: string,
    accept_terms: 1 | 0,
    password: string,
    password_confirmation: string
}) => apiClient("/api/auth/register", { method: "POST", body: JSON.stringify(credentials) });

export const forgetPassword = (email: string) => apiClient("/api/auth/forget-password", { method: "POST", body: JSON.stringify({ email }) });

export const verify = (data: { email: string, otp: string }) => apiClient("/api/auth/verify", { method: "POST", body: JSON.stringify(data) });

export const resetPassword = (data: { email: string, password: string, password_confirmation: string }) => apiClient("/api/auth/reset-password", { method: "POST", body: JSON.stringify(data) });

export const resendCode = (email: string) => apiClient("/api/auth/resend-code", { method: "POST", body: JSON.stringify({ email }) });
