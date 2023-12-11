export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
};

export type Show = {
    _id?: string;
    id: number;
    date: string;
    seat: number;
    price: number;
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
