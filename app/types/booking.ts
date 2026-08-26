export interface StandardPriceResponse {
    status: string;
    message: string;
    data: {
        recommended_price_by_app: number;
        vat: number;
    }
}

export interface DayTiming {
    day: number;
    is_open: boolean;
    price: number;
    vat: number;
    app_tax: number;
}

export interface MonthTiming {
    month_number: number;
    month_name: string;
    days: DayTiming[];
}

export interface TimingWebResponse {
    status: string;
    data: MonthTiming[];
}

export interface StatusItem {
    id: number;
    name: string;
}

export interface StatusesResponse {
    status: string;
    data: StatusItem[];
}

export interface LangItem {
    id: number;
    name: string;
}

export interface LangsResponse {
    status: string;
    data: LangItem[];
}

export interface RelativeItem {
    id: number;
    name: string;
}

export interface RelativesResponse {
    status: string;
    data: RelativeItem[];
}

export interface CreateBookingPayload {
    umrah_for_whom_name: string;
    status_id: number;
    relative_id: number;
    phone: string;
    phone_code: string;
    motamer_required_lang_id: number;
    motamer_gender: "male" | "female";
    date: string; // YYYY-MM-DD
}
