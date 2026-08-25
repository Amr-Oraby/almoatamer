import { serverGet, serverPost, serverPut } from "@/lib/api/serverRoute";

export async function GET(request: Request, { params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    return serverGet(`${module}`);
}


export async function POST(request: Request, { params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("multipart/form-data") ? await request.formData() : await request.json();
    return serverPost(`${module}`, body);
}

export async function PUT(request: Request, { params }: { params: Promise<{ module: string }> }) {
    const { module } = await params;
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("multipart/form-data") ? await request.formData() : await request.json();
    return serverPut(`${module}`, body);
}
