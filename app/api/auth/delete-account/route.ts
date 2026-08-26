import { serverDelete } from "@/lib/api/serverRoute";

export async function DELETE() {
    const response = await serverDelete("profile", true);

    response.cookies.delete("access_token");
    response.cookies.delete("user_data");

    return response;
}
