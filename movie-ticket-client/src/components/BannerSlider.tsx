import { useState } from "react";
import { useQuery } from "react-query";
import useAxiosTMDB from "../Hooks/useTMDB";
import { Movie, Show } from "../types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/styles.css";

export default function BannerSlider({ showData }: { showData: Show }) {
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    const [data, setData] = useState<Movie>();
    useQuery({
        queryKey: ["shows", showData._id],
        queryFn: async () => {
            await axios
                .get<Movie>(`/movie/${showData.id}`)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        refetchOnWindowFocus: false,
    });

    return (
        <>{data && <img src={`${imagePrefix}${data?.poster_path}`} alt="" />}</>
    );
}
