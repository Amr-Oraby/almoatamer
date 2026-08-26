import { serverGet } from "@/lib/api/serverRoute";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chat_id");
    return serverGet(`chat?chat_id=${chatId}`);
}
