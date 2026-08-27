import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { error: "No code received from Google" },
            { status: 400 }
        );
    }

    // Exchange Google's authorization code for Google tokens
    const tokenResponse = await fetch(
        "https://oauth2.googleapis.com/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.AUTH_GOOGLE_ID!,
                client_secret: process.env.AUTH_GOOGLE_SECRET!,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
                grant_type: "authorization_code",
            }),
        }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
        return NextResponse.json(
            { error: "Failed to get Google tokens", details: tokens },
            { status: tokenResponse.status }
        );
    }

    // Get the user's name and email from Google
    const userResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        }
    );

    const user = await userResponse.json();

    if (!userResponse.ok) {
        return NextResponse.json(
            { error: "Failed to get Google user information" },
            { status: userResponse.status }
        );
    }

    // Send Google information to your backend
    const backendResponse = await fetch(
        "http://umrah.azmy.aait-d.com/api/v1/client/social-login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                social_login_type: "google",
                social_login_token: tokens.id_token,
                device_type: "web",
                name: user.name,
                email: user.email,
            }),
        }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok || !data.data?.token) {
        return NextResponse.json(
            { error: data.message || "Social login failed" },
            { status: backendResponse.status || 400 }
        );
    }

    // Create the redirect response
    const redirectResponse = NextResponse.redirect(
        new URL("/", request.url)
    );

    // Store your backend JWT in the auth cookie
    redirectResponse.cookies.set("access_token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return redirectResponse;
}