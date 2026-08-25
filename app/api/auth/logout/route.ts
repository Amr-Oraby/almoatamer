import { serverPost } from "@/lib/api/serverRoute";

export async function POST() {
    const response = await serverPost("logout", undefined, true);

    response.cookies.delete("access_token");
    response.cookies.delete("user_data");

    return response;
}