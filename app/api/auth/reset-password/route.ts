"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getTokenExpiry } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch("https://umrah.azmy.aait-d.com/api/v1/client/reset-forgotten-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: body.email,
                password: body.password,
                password_confirmation: body.password_confirmation,
            })
        });

        const data = await response.json();

        if (!response.ok || data?.status === "fail" || !data?.status) {
            return NextResponse.json(data, { status: response.status !== 200 ? response.status : 401 });
        }

        const token = data?.data?.token;
        if (!token) {
            return NextResponse.json({ message: "No token received" }, { status: 401 });
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

        cookieStore.delete("password_reset_granted");

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
        return NextResponse.json({ message: error.message || "Reset password failed" }, { status: 401 });
    }
}
