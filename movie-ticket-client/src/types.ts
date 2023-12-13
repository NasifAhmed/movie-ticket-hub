export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    backdrop_path: string;
    original_language: string;
    runtime: number;
    budget: number;
    tagline: string;
};

export type Show = {
    _id?: string;
    id: number;
    date: string;
    seat: number;
    price: number;
    review?: string[];
};

export type Ticket = {
    show: Show | string;
    user: User | string;
};

export type User = {
    _id?: string;
    name: string;
    email: string;
    role: "user" | "admin";
};
