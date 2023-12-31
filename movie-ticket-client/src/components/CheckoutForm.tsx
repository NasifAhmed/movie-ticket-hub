// import { useAxios } from "@/hooks/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { UserContext } from "../providers/UserProvider";
import { Show, Ticket } from "../types";

function CheckoutForm({ showData }: { showData: Show }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axios = useAxios();
    const { userFromDB } = useContext(UserContext);

    const [clientSecret, setClientSecret] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (showData.price) {
            axios
                .post("/create-payment-intent", {
                    price: showData.price,
                })
                .then((res) => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [showData.price]);

    const buyTicket = useMutation({
        mutationFn: async (payload: Ticket) => {
            await axios
                .post(`/ticket`, payload)
                .then((res) => {
                    console.log(`Ticket post to DB response ${res}`);
                })
                .catch((e) => console.log(`Ticket post to DB error : ${e}`));
        },
    });

    const queryClient = useQueryClient();
    const showMutation = useMutation({
        mutationFn: (payload: Show) =>
            axios
                .post("/show", payload)
                .then((res) => console.log(`Post query response ${res}`)),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["shows"],
            });
        },
    });

    const updateDB = async () => {
        if (showData._id) {
            await buyTicket
                .mutateAsync({
                    show: showData._id,
                    user: userFromDB?._id as string,
                })
                .then(async () => {
                    await showMutation
                        .mutateAsync({
                            ...showData,
                            seat: showData.seat - 1,
                        })
                        .then(() => {
                            window.location.reload();
                        });
                });
        }
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        toast.loading("Processing payment .....");

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("payment error", error);
            setError(error.message as string);
        } else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log("Confirm error", confirmError);
            setError(confirmError.message as string);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("Transaxtion id");
                updateDB();
            }
        }
        const modalElement = document.getElementById("modal") as any;

        if (modalElement) {
            modalElement.checked = false;
            modalElement.removeAttribute("open");
        } else {
            // Handle the case when the element with id "modal" is not found
            console.error("Element with id 'modal' not found");
        }
        toast.success("Successfull payment !");
    };

    return (
        <form className="space-y-4" onSubmit={submitHandler}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <p className="text-destructive">{error}</p>
            <button
                className="btn"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                PAY
            </button>
        </form>
    );
}

export default CheckoutForm;
