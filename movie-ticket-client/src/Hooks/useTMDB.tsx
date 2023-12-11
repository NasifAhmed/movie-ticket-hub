import axios from "axios";

export default function useAxiosTMDB() {
    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        timeout: 1000,
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjA1Y2ZkOTg2YzkzNzhmOTg2OTA1MjQwMTdhMDhiNyIsInN1YiI6IjYxZjY5MTE4NmRjNTA3MDA0NDhkOWZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTsRYnGorY7zPrSF9W0gu2_bI8Mvj40bvm5MLP3Fimo",
        },
    });
    const imagePrefix = "https://image.tmdb.org/t/p/w500";
    return { instance, imagePrefix };
}
