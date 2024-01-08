import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { Show } from "../types";

export default function ReviewShow() {
    const { id } = useParams();
    const [showData, setShowData] = useState<Show>();
    const axios = useAxios();
    useEffect(() => {
        axios.get(`/show?_id=${id}`).then((res) => {
            setShowData(res.data[0]);
        });
    }, [id]);
    return (
        <>
            <Helmet>
                <title>Review | Movie Ticket Hub</title>
            </Helmet>
            <div>
                <h1 className="font-bold text-4xl text-center mb-10">
                    Reviews
                </h1>
                <ul className="text-center text-lg">
                    {showData &&
                        showData.review?.map((review) => {
                            return (
                                <li>
                                    <div className="border border-black/10 p-10 mb-5">
                                        {`"`}
                                        {review}
                                        {`"`}
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}
