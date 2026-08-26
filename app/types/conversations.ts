import { ApiResponse } from "./UserType";

export interface ChatUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface ConversationMessage {
    id: number;
    message: string;
    message_type: string;
    agoTime: string;
    sent_at: string;
}

export interface Conversation {
    id: number;
    reciever_name: ChatUser;
    last_message: ConversationMessage | null;
    unread_messages_count: number;
    is_read_messages: boolean;
}

export type ConversationsResponse = ApiResponse<Conversation[]>;

export interface Message {
    id: number;
    sender: ChatUser;
    receiver: ChatUser;
    message_type: string;
    message: string;
    read_at: string | null;
    type: "me" | "other";
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface ChatDetails {
    id: number;
    chat_id: number;
    umrah_id: number | null;
    receiver: ChatUser;
    messages: Message[];
    ago_time: string;
    can_send_message: boolean | null;
    created_at: string;
    updated_at: string;
}

export type ChatResponse = ApiResponse<ChatDetails>;
