import { useRef, useState } from "react";
import useAxiosTMDB from "../Hooks/useTMDB";
import AddMovie from "../pages/AddMovie";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

export default function SearchMovie() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<Movie[]>();
    const [selectedData, setSelectedData] = useState<Movie>();
    const { instance: axios } = useAxiosTMDB();

    function handleSearch() {
        // e.preventDefault();
        console.log(inputRef.current?.value);
        const input = inputRef.current?.value;
        axios
            // .get(`/movie/${id}`)
            .get(`/search/movie?query=${input}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data.results.slice(0, 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-center font-bold text-xl">
                Search the movie you want to add
            </h1>
            <div className="join">
                <input
                    ref={inputRef}
                    className="input input-bordered join-item"
                    placeholder="Search"
                />
                <button
                    onClick={handleSearch}
                    className="btn join-item rounded-r-full"
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {data &&
                    !selectedData &&
                    data?.map((data) => {
                        return (
                            <MovieCard
                                key={data.id}
                                selectStateFunction={setSelectedData}
                                id={data.id}
                            />
                        );
                    })}
            </div>
            {selectedData && (
                <>
                    <AddMovie movie={selectedData} />
                </>
            )}
        </div>
    );
}
