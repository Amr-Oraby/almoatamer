export interface Language {
    id: number;
    name: string;
    short_name: string;
}

export interface Relative {
    id: number;
    name: string;
}

export interface Status {
    id: number;
    name: string;
}

export interface TwafData {
    date: string | null;
    twaf_num: number;
}

export interface QuestData {
    date: string | null;
    quest_num: number;
}

export interface CycleStep {
    id: number;
    key: string;
    date: string | null;
    media: string | null;
    title: string;
    is_done: boolean;
    other_data: TwafData[] | QuestData[] | null;
}

export interface Order {
    id: number;
    umrah_id: number;
    name: string;
    phone_code: string | null;
    phone: string | null;
    image: string | null;
    date: string;
    hijri_date: string;
    unformatted_date: string;
    gender: 'male' | 'female';
    moatmer_id: number | null;
    recommended_price: number;
    price: number;
    discount: number;
    tax_value: number;
    tax_amount: number;
    total_price: number;
    client_rate: number | null;
    moatmer_rate: number | null;
    language: Language;
    moatmer_appointed: boolean;
    is_paid: boolean;
    umrah_status: string;
    umrah_status_trans: string;
    is_saved_data: boolean;
    relative: Relative;
    other_relation: string | null;
    status: Status;
    cycle: CycleStep[];
    media: unknown[];
    chat_id: number | null;
    documented_media: unknown[];
    instapay: string;
    created_at: string;
    updated_at: string;
}

export interface OrderResponse {
    data: Order;
    status: string;
    message: string;
}

export interface OrdersResponse {
    data: Order[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    status: string;
    message: string;
}
