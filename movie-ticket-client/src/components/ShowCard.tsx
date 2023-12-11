import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import useAxiosTMDB from "../Hooks/useTMDB";
import CheckoutForm from "../components/CheckoutForm";
import { UserContext } from "../providers/UserProvider";
import { Movie, Show } from "../types";
import Spinner from "./Spinner";
import { AuthContext } from "../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

export default function ShowCard({ showData }: { showData: Show }) {
    const { userFromDB } = useContext(UserContext);
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<Movie>();
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
                        <div className="card-actions justify-end">
                            <button
                                onClick={() => {
                                    const modal = document?.getElementById(
                                        `modal${showData?._id}`
                                    ) as HTMLDialogElement;

                                    if (modal) {
                                        modal.showModal();
                                    }
                                }}
                                className="btn btn-primary"
                                disabled={userFromDB?.role === "admin" || !user}
                            >
                                Buy Now
                            </button>
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
                        <span className="font-semibold">Price : </span>$
                        {showData.price}
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
