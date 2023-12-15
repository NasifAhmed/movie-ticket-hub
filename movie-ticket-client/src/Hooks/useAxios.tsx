import axios from "axios";

export default function useAxios() {
    const instance = axios.create({
        // baseURL: "http://localhost:5000",
        baseURL: "https://movie-ticket-server-alpha.vercel.app",
        timeout: 1000,
        withCredentials: true,
    });
    return instance;
}
