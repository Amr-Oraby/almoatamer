export type NewsImage = {
    id: number;
    news_id: number;
    image: string;
    created_at: string;
    updated_at: string;
};

export type NewsItem = {
    id: number;
    title: string;
    description: string;
    slug: string;
    alt: string;
    is_active: boolean;
    images?: NewsImage;
};

export type PaginationLinks = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLinks[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

export type NewsResponse = {
    status: string;
    message: string;
    data: NewsItem[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: PaginationMeta;
};
