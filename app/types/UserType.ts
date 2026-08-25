export interface Country {
    id: number;
    name: string;
    short_name: string;
    code: string;
    flag: string;
    nationality_name: string;
    max_length: number;
    created_at: string;
    updated_at: string;
}

export interface UserData {
    id: number;
    name: string;
    phone: string;
    phone_code: string;
    email: string;
    locale: string;
    image: string | null;
    gender: string;
    is_active: boolean;
    accepted_by_admin: boolean;
    token: string;
    country: Country;
    latitude: number | null;
    longitude: number | null;
}

export interface AuthResponse {
    data: UserData | null;
    status: string;
    message: string;
}

export interface ApiResponse<T> {
    data: T;
    status: string;
    message: string;
}

export type ProfileResponse = ApiResponse<UserData>;
export type CountriesResponse = ApiResponse<Country[]>;
