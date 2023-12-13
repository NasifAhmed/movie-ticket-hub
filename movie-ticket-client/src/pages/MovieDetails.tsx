import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useTMDB";
import { Movie } from "../types";

export default function MovieDetails() {
    const { id } = useParams();
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    const navigate = useNavigate();
    const movieResponse = useQuery({
        queryKey: ["movies", "details", id],
        queryFn: async () => {
            const response = await axios
                .get<Movie>(`/movie/${id}`)
                .then((res) => {
                    console.log(res.data);
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            return response;
        },
        enabled: !!id,
    });
    return (
        <div className="flex flex-col justify-center items-center w-full gap-5">
            <h1 className="font-bold text-5xl">{movieResponse.data?.title}</h1>
            <h2 className="font-medium text-xl">
                {movieResponse.data?.tagline}
            </h2>
            <img
                src={`${imagePrefix}${movieResponse.data?.poster_path}`}
                alt=""
                className="max-h-96"
            />
            {/* <img
                src={`${imagePrefix}${movieResponse.data?.backdrop_path}`}
                alt=""
            /> */}
            <p className="leading-relaxed text-lg text-center max-w-2xl">
                {movieResponse.data?.overview}
            </p>
            <h2>
                <span className="text-lg font-bold">Language : </span>
                {movieResponse.data?.original_language}
            </h2>
            <h2>
                <span className="text-lg font-bold">Release Date : </span>
                {movieResponse.data?.release_date}
            </h2>
            <h2>
                <span className="text-lg font-bold">Runtime : </span>
                {movieResponse.data?.runtime} min
            </h2>
            <h2>
                <span className="text-lg font-bold">Budget : </span>$
                {movieResponse.data?.budget}
            </h2>
            <button
                className="btn btn-primary"
                onClick={() => navigate(`/shows`)}
            >
                Buy Tickets
            </button>
        </div>
    );
}
