import { NextResponse } from "next/server";

export async function GET() {
    // Google's login door
    const googleUrl = new URL(
        "https://accounts.google.com/o/oauth2/v2/auth"
    );
    // Google asks Which application is asking me to authenticate this user?
    googleUrl.searchParams.set(
        "client_id",
        process.env.AUTH_GOOGLE_ID!
    );

    // When you're finished, come back to this address.
    googleUrl.searchParams.set(
        "redirect_uri",
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    );

    // Don't give me the final login token directly. Give me a temporary authorization code.
    googleUrl.searchParams.set("response_type", "code");

    // What information do you want from the user?
    googleUrl.searchParams.set(
        "scope",
        "openid email profile"
    );

    return NextResponse.redirect(googleUrl);
}