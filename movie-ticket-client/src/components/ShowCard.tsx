import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import useAxiosTMDB from "../Hooks/useTMDB";
import CheckoutForm from "../components/CheckoutForm";
import { AuthContext } from "../providers/AuthProvider";
import { UserContext } from "../providers/UserProvider";
import { Movie, Show } from "../types";
import Spinner from "./Spinner";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

export default function ShowCard({ showData }: { showData: Show }) {
    const { userFromDB } = useContext(UserContext);
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<Movie>();
    const navigate = useNavigate();
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    // useEffect(() => {
    //     axios
    //         // .get(`/movie/${id}`)
    //         .get(`/movie/${showData.id}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [showData]);

    const movieResponse = useQuery({
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

    const axiosNormal = useAxios();

    const queryClient = useQueryClient();
    const deleteHandler = async () => {
        await axiosNormal
            .delete<Movie>(`/show?_id=${showData._id}`)
            .then((res) => {
                console.log(`Show post response : `, res);
                queryClient.invalidateQueries({
                    queryKey: [["shows", showData._id]],
                });
            })
            .catch((e) => {
                console.log(e);
            })
            .then(() => {
                toast.success("Successfull deleted !");
                window.location.reload();
            });
    };

    return (
        <>
            {movieResponse.isLoading && (
                <Spinner condition={movieResponse.isLoading} />
            )}
            {data && (
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={`${imagePrefix}${data.poster_path}`}
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.title}</h2>
                        <p>
                            <span className="font-semibold">Schedule : </span>
                            {showData.date}
                        </p>
                        <p>
                            <span className="font-semibold">Seats : </span>
                            {showData.seat}
                        </p>
                        <p>
                            <span className="font-semibold">Price : </span>$
                            {showData.price}
                        </p>
                        <div className="card-actions justify-between mt-5">
                            <button
                                onClick={() =>
                                    navigate(`/movie-details/${showData.id}`)
                                }
                                className="btn btn-primary"
                            >
                                Details
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/review-show/${showData._id}`)
                                }
                                className="btn btn-primary"
                            >
                                Reviews
                            </button>
                            {userFromDB?.role === "admin" ? (
                                <button
                                    onClick={deleteHandler}
                                    className="btn btn-warning"
                                >
                                    Delete
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        const modal = document?.getElementById(
                                            `modal${showData?._id}`
                                        ) as HTMLDialogElement;

                                        if (modal) {
                                            modal.showModal();
                                        }
                                    }}
                                    className="btn btn-secondary"
                                    disabled={!user}
                                >
                                    Buy Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <dialog
                id={`modal${showData?._id}`}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Ticket</h3>
                    <p className="py-4">
                        Enter payment details below and confirm your ticket
                    </p>
                    <p>
                        <span className="font-semibold">Price : </span>
                        {showData.price} Taka
                    </p>
                    <br></br>
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm showData={showData} />
                        </Elements>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
