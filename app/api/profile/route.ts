import { serverGet, serverPost, serverPut } from "@/lib/api/serverRoute";

export async function GET() {
    return serverGet("profile");
}


export async function POST(request: Request) {
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("multipart/form-data") ? await request.formData() : await request.json();
    return serverPost("profile", body);
}