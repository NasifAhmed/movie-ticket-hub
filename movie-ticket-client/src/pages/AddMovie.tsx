import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { Movie, Show } from "../types";

export default function AddMovie({ movie }: { movie: Movie }) {
    const axios = useAxios();
    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast.loading("Adding show......");
        const form = new FormData(e.currentTarget);
        const date = form.get("date");
        const seat = form.get("seat");
        const price = form.get("price");
        const show: Show = {
            id: movie.id,
            date: date as string,
            seat: parseInt(seat as string) as number,
            price: parseInt(price as string) as number,
        };

        await axios
            .post("/show", show)
            .then((res) => {
                console.log(`Show post response : `, res);
            })
            .catch((e) => {
                console.log(e);
            })
            .then(() => {
                toast.success("Successfull added !");
                window.location.reload();
            });
    }

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={submitHandler}>
                <div>
                    <label className="label">
                        <span className="label-text font-bold">Movie : </span>
                        <span className="label-text">{movie.title}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Schedule</span>
                    </label>
                    <input
                        type="datetime-local"
                        name="date"
                        placeholder="Schedule"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Number of seats</span>
                    </label>
                    <input
                        type="number"
                        name="seat"
                        placeholder="Number of seats"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price($)</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price for each ticket"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        ADD
                    </button>
                </div>
            </form>
        </div>
    );
}
