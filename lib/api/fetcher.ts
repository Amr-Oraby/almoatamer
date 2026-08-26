import { getLocale } from 'next-intl/server';
import { headers as nextHeaders } from 'next/headers';

const BASE_URL = "https://umrah.azmy.aait-d.com/api/v1/client/";

interface FetchOptions extends Omit<RequestInit, "body"> {
    endpoint: string;
    body?: unknown;
}

export async function apiFetch<T>({
    endpoint,
    headers,
    body,
    ...options
}: FetchOptions): Promise<T> {
    let locale = 'en';
    
    // 1. Resolve current locale
    try {
        locale = await getLocale();
    } catch {
        try {
            const reqHeaders = await nextHeaders();
            const intlLocale = reqHeaders.get('x-next-intl-locale');
            if (intlLocale) {
                locale = intlLocale;
            } else {
                const urlPath = reqHeaders.get('x-invoke-path') || reqHeaders.get('x-url') || '';
                const referer = reqHeaders.get('referer') || '';
                if (urlPath.match(/^\/(ar)(\/|$)/) || referer.match(/\/(ar)(\/|$)/)) {
                    locale = 'ar';
                }
            }
        } catch {
            // Fallback to 'en'
        }
    }

    const mergedHeaders: Record<string, string> = { ...(headers as Record<string, string> || {}) };
    
    const isFormData = body instanceof FormData;
    if (!mergedHeaders["Content-Type"] && !isFormData) {
        mergedHeaders["Content-Type"] = "application/json";
    } else if (mergedHeaders["Content-Type"]?.includes("multipart/form-data")) {
        delete mergedHeaders["Content-Type"];
    }
    
    if (!Object.keys(mergedHeaders).some(k => k.toLowerCase() === 'accept-language')) {
        mergedHeaders["Accept-Language"] = locale;
    }
    if (!Object.keys(mergedHeaders).some(k => k.toLowerCase() === 'accept')) {
        mergedHeaders["Accept"] = "application/json";
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: mergedHeaders,
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
        next: options.next || { revalidate: 0 },
        cache: options.cache || 'no-store',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || `Request failed: ${response.status}`) as Error & { status?: number };
        error.status = response.status;
        throw error;
    }

    return response.json() as Promise<T>;
}