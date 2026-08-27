import { NextResponse } from "next/server";

export async function GET() {
    const googleUrl = new URL(
        "https://accounts.google.com/o/oauth2/v2/auth"
    );

    googleUrl.searchParams.set(
        "client_id",
        process.env.AUTH_GOOGLE_ID!
    );

    googleUrl.searchParams.set(
        "redirect_uri",
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    );

    googleUrl.searchParams.set("response_type", "code");

    googleUrl.searchParams.set(
        "scope",
        "openid email profile"
    );

    return NextResponse.redirect(googleUrl);
}