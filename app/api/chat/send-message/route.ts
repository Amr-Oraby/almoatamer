import { serverPost } from "@/lib/api/serverRoute";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    return serverPost(`send-message`, formData);
}
