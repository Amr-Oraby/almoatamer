import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChat, readMessages, sendMessage } from "./api";

export const useChat = (chatId: string | number) => {
    return useQuery({
        queryKey: ["chat", String(chatId)],
        queryFn: () => getChat(chatId),
        refetchInterval: 3000,
        enabled: !!chatId,
    });
};

export const useReadMessages = () => {
    return useMutation({
        mutationFn: (chatId: string | number) => readMessages(chatId),
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ chatId, receiverId, message, type }: { 
            chatId: string | number; 
            receiverId: string | number;
            message: string | File;
            type: "text" | "file";
        }) => 
            sendMessage(chatId, receiverId, message, type),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["chat", String(variables.chatId)],
            });
        },
    });
};
