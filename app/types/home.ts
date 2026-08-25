export type SectionOneData = {
    info: string;
    images: string;
};

export type SectionTwoData = {
    info: string;
    images: string;
};

export type SectionThreeData = {
    experience_years: number;
    prizes: number;
    moatmers_count: number;
    done_umrahs_count: number;
};

export type Testimonial = {
    id: number;
    image: string;
    text: string;
    name: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
};

export type SectionFourData = Testimonial[];

export type SectionFiveData = string[];

export type HomeData = {
    section_one: SectionOneData;
    section_two: SectionTwoData;
    section_three: SectionThreeData;
    section_four: SectionFourData;
    section_five: SectionFiveData;
};

export type HomeApiResponse = {
    status: string;
    message: string;
    data: HomeData;
    seo_meta: {
        id: number;
        title: string;
        description: string;
        canonical: string;
        slug: string;
        keywords: string;
    };
};
