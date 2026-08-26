"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api/fetcher";
import { getTokenExpiry } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const data = await apiFetch<any>({
            endpoint: "register",
            method: "POST",
            body: {
                name: body.name,
                phone_code: body.phone_code,
                phone: body.phone,
                email: body.email,
                accept_terms: body.accept_terms,
                password: body.password,
                password_confirmation: body.password_confirmation
            }
        });

        if (data?.status === "fail" || !data?.status) {
            return NextResponse.json(data, { status: 400 });
        }

        const token = data?.data?.token;
        if (!token) {
            // If the API doesn't return a token on register, we can just return success 
            // and the user will have to login manually.
            return NextResponse.json({
                status: data?.status,
                message: data?.message,
            });
        }

        const tokenExpiry = getTokenExpiry(token);
        const maxAge = tokenExpiry
            ? Math.max(1, tokenExpiry - Math.floor(Date.now() / 1000))
            : 60 * 60 * 24 * 60;

        const cookieStore = await cookies();
        cookieStore.set("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge
        });

        cookieStore.set("user_data", JSON.stringify(data?.data), {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge
        });

        return NextResponse.json({
            status: data?.status,
            message: data?.message,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Registration failed" }, { status: error.status || 400 });
    }
}