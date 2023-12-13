import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { Show } from "../types";

export default function Reviews() {
    const { id } = useParams();
    const axios = useAxios();
    const [showData, setShowData] = useState<Show>();

    useEffect(() => {
        axios.get(`/show?_id=${id}`).then((res) => {
            setShowData(res.data[0]);
        });
    }, [id]);

    const reviewMudation = useMutation({
        mutationFn: async (payload: Show) => {
            await axios
                .post(`/show`, payload)
                .then((res) => {
                    console.log(`Review post to DB response ${res}`);
                })
                .catch((e) => console.log(`Review post to DB error : ${e}`));
        },
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Button click ");
        console.log("Show ", showData);
        const form = new FormData(e.currentTarget);
        const review = form.get("review");
        console.log(review);
        if (showData) {
            reviewMudation.mutate({
                ...showData,
                review: [...(showData.review as any), review as string],
            });
        }
    };
    return (
        <div className="flex justify-center items-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={submitHandler}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-xl">
                                Review
                            </span>
                        </label>
                        <textarea
                            name="review"
                            placeholder="review"
                            className="input input-bordered p-5 h-40 w-full"
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
