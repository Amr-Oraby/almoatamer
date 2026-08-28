import { NextResponse } from "next/server";

export async function GET() {
    const facebookUrl = new URL(
        "https://www.facebook.com/v21.0/dialog/oauth"
    );

    facebookUrl.searchParams.set(
        "client_id",
        process.env.AUTH_FACEBOOK_ID!
    );

    facebookUrl.searchParams.set(
        "redirect_uri",
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`
    );

    facebookUrl.searchParams.set(
        "response_type",
        "code"
    );

    facebookUrl.searchParams.set(
        "scope",
        "email,public_profile"
    );

    return NextResponse.redirect(facebookUrl);
}
