import { apiClient } from "@/lib/api/client";
import { ChatResponse } from "@/app/types/conversations";

export const getChat = (chatId: number | string) => 
    apiClient<ChatResponse>(`/api/chat?chat_id=${chatId}`, { method: "GET" });

export const readMessages = (chatId: number | string) => {
    const formData = new FormData();
    formData.append("chat_id", chatId.toString());
    return apiClient<ChatResponse>("/api/chat/read-messages", {
        method: "POST",
        body: formData,
    });
};

export const sendMessage = (
    chatId: number | string, 
    receiverId: number | string,
    message: string | File,
    type: "text" | "file"
) => {
    const formData = new FormData();
    formData.append("chat_id", chatId.toString());
    formData.append("reciever_id", receiverId.toString()); // Note: using backend spelling
    formData.append("message_type", type);
    formData.append("message", message);
    return apiClient<ChatResponse>("/api/chat/send-message", {
        method: "POST",
        body: formData,
    });
};
