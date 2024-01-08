import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { User } from "../types";

export default function Register() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const axios = useAxios();

    const userMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const name = form.get("name");
        const password = form.get("password");
        const user: User = {
            name: name as string,
            email: email as string,
            role: "user",
        };
        authContext
            .createUser(email as string, password as string)
            .then(async (result) => {
                userMutation.mutate(user);
                console.log(result.user);
                navigate(`/`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Helmet>
                <title>Register | Movie Ticket Hub</title>
            </Helmet>
            <div className="flex justify-center items-center">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={submitHandler}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
