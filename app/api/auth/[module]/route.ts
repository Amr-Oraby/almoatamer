import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request, { params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("multipart/form-data") ? await request.formData() : await request.json();

    const response = await serverPost(module, body, false);

    if (response.status === 200) {
        if (module === "forget-password") {
            const email = body.email || (body.get && body.get("email"));
            if (email) {
                response.cookies.set("pending_verification_email", email, { maxAge: 300, httpOnly: true, path: "/" });
            }
        } else if (module === "verify") {
            const email = body.email || (body.get && body.get("email"));
            if (email) {
                response.cookies.delete("pending_verification_email");
                response.cookies.set("password_reset_granted", email, { maxAge: 300, httpOnly: true, path: "/" });
            }
        }
    }

    return response;
}
