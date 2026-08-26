import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiFetch } from "./fetcher";

interface ServerRouteOptions {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    requireAuth?: boolean;
    headers?: Record<string, string>;
    errorMessage?: string;
}

interface ServerResponse {
    status?: string;
    message?: string;
    data?: unknown;
}

export async function serverRoute({
    endpoint,
    method = "GET",
    body,
    requireAuth = true,
    headers = {},
    errorMessage = "Request failed",
}: ServerRouteOptions) {
    try {
        const requestHeaders: Record<string, string> = { ...headers };

        if (requireAuth) {
            const cookieStore = await cookies();
            const token = cookieStore.get("access_token")?.value;

            if (!token) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            requestHeaders["Authorization"] = `Bearer ${token}`;
        }

        const data = await apiFetch<ServerResponse>({
            endpoint,
            method,
            body,
            headers: requestHeaders,
        });

        if (data?.status === "fail") {
            return NextResponse.json(data, { status: 400 });
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        console.error(`Route Error [${method} ${endpoint}]:`, err);
        return NextResponse.json(
            { message: err.message || errorMessage },
            { status: err.status || 500 }
        );
    }
}

export const serverGet = (endpoint: string, requireAuth = true, headers?: Record<string, string>) =>
    serverRoute({ endpoint, method: "GET", requireAuth, headers, errorMessage: "Failed to fetch data" });

export const serverPost = (endpoint: string, body: unknown, requireAuth = true, headers?: Record<string, string>) =>
    serverRoute({ endpoint, method: "POST", body, requireAuth, headers, errorMessage: "Failed to submit data" });

export const serverPut = (endpoint: string, body: unknown, requireAuth = true, headers?: Record<string, string>) =>
    serverRoute({ endpoint, method: "PUT", body, requireAuth, headers, errorMessage: "Failed to update data" });

export const serverDelete = (endpoint: string, requireAuth = true, headers?: Record<string, string>) =>
    serverRoute({ endpoint, method: "DELETE", requireAuth, headers, errorMessage: "Failed to delete data" });