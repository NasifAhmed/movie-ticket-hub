// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/styles.css";

// import required modules
import { useQuery } from "react-query";
import { Autoplay, Pagination } from "swiper/modules";
import useAxios from "../Hooks/useAxios";
import { Show } from "../types";
import BannerSlider from "./BannerSlider";

export default function Banner() {
    const axios = useAxios();

    const showResponse = useQuery({
        queryKey: ["show"],
        queryFn: async (): Promise<Show[] | null> => {
            try {
                const res = await axios.get("/show");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching show data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {showResponse.data && (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: false,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper max-h-[50vh]"
                >
                    <>
                        {showResponse.data &&
                            showResponse.data.map((show) => {
                                return (
                                    <SwiperSlide>
                                        <BannerSlider showData={show} />
                                    </SwiperSlide>
                                );
                            })}
                    </>
                </Swiper>
            )}
        </>
    );
}
