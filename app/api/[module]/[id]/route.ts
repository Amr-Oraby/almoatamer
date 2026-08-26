import { serverDelete, serverGet } from "@/lib/api/serverRoute";
import { serverPost } from "@/lib/api/serverRoute";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string }>;
    }
) {
    const { module, id } = await params;

    const { searchParams } = new URL(request.url);

    const queryString = searchParams.toString();

    const endpoint = queryString
        ? `${module}/${id}?${queryString}`
        : `${module}/${id}`;

    return serverGet(endpoint);
}

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string }>;
    }
) {
    const { module, id } = await params;

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const endpoint = queryString
        ? `${module}/${id}?${queryString}`
        : `${module}/${id}`;

    const contentType = request.headers.get("content-type") || "";

    const body = contentType.includes("multipart/form-data")
        ? await request.formData()
        : await request.json();

    return serverPost(endpoint, body);
}

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string }>;
    }
) {
    const { module, id } = await params;
    const endpoint = `${module}/${id}`

    return serverDelete(endpoint);
}

