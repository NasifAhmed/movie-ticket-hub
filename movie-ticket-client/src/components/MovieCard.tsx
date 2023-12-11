import { useEffect, useState } from "react";
import useAxiosTMDB from "../Hooks/useTMDB";
import { Movie } from "../types";

export default function MovieCard({
    id,
    selectStateFunction,
}: {
    id: number;
    selectStateFunction: React.Dispatch<
        React.SetStateAction<Movie | undefined>
    >;
}) {
    const [data, setData] = useState<Movie>();
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    useEffect(() => {
        axios
            // .get(`/movie/${id}`)
            .get(`/movie/${id}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function selectHandler() {
        selectStateFunction(data);
    }
    return (
        <>
            {data && (
                <div className="card w-60 bg-base-100 shadow-xl image-full">
                    <figure>
                        <img
                            src={`${imagePrefix}${data.poster_path}`}
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.title}</h2>
                        {/* <p>{data.overview}</p> */}
                        <p>{data.release_date}</p>
                        <div className="card-actions justify-center">
                            <button
                                onClick={selectHandler}
                                className="btn btn-primary"
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
