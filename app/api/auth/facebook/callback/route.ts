import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // User cancelled Facebook login
    if (error) {
        return NextResponse.redirect(
            new URL("/ar/auth/login", request.url)
        );
    }

    if (!code) {
        return NextResponse.redirect(
            new URL("/ar/auth/login?error=facebook_login_failed", request.url)
        );
    }

    // Exchange the authorization code for a Facebook access token
    const tokenResponse = await fetch(
        "https://graph.facebook.com/v21.0/oauth/access_token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.AUTH_FACEBOOK_ID!,
                client_secret: process.env.AUTH_FACEBOOK_SECRET!,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`,
                code,
            }),
        }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
        return NextResponse.redirect(
            new URL("/ar/auth/login?error=facebook_token_failed", request.url)
        );
    }

    // Get the user's name and email from Facebook
    const userResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokens.access_token}`
    );

    const user = await userResponse.json();

    if (!userResponse.ok) {
        return NextResponse.redirect(
            new URL("/ar/auth/login?error=facebook_user_failed", request.url)
        );
    }

    // Send Facebook information to your backend
    const backendResponse = await fetch(
        "http://umrah.azmy.aait-d.com/api/v1/client/social-login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                social_login_type: "facebook",
                social_login_token: tokens.access_token,
                device_type: "web",
                name: user.name,
                email: user.email,
            }),
        }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok || !data.data?.token) {
        return NextResponse.redirect(
            new URL("/ar/auth/login?error=social_login_failed", request.url)
        );
    }

    // Redirect to the home page after successful login
    const redirectResponse = NextResponse.redirect(
        new URL("/ar", request.url)
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