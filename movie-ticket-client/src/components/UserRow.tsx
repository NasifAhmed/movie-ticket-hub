import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { User } from "../types";

export default function UserRow({ userData }: { userData: User }) {
    const navigate = useNavigate();
    const axios = useAxios();
    const queryClient = useQueryClient();

    const makeAdminHandler = async (payLoad: User) => {
        await axios.post("/user", payLoad).then(() => {
            console.log("Successfully posted user data");

            queryClient.invalidateQueries({
                queryKey: ["users", "manage"],
            });
        });
    };

    // const banHandler = async () => {
    //     await axios.delete(`/user`).then(()=>{
    //         console.log("Successfully posted user data");
    //     })
    // }

    return (
        <>
            <tbody>
                {/* row 1 */}
                <tr>
                    <td>
                        <div className="font-bold">{userData.name}</div>
                    </td>
                    <td>{userData.email}</td>
                    <td>{userData.role}</td>
                    <th>
                        {userData.role === "admin" ? (
                            <>
                                <button
                                    onClick={() => {
                                        makeAdminHandler({
                                            ...userData,
                                            role: "user",
                                        });
                                        navigate(``);
                                    }}
                                    className={`btn btn-primary btn-xs`}
                                >
                                    Make User
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        makeAdminHandler({
                                            ...userData,
                                            role: "admin",
                                        });
                                        navigate(``);
                                    }}
                                    className={`btn btn-primary btn-xs`}
                                >
                                    Make Admin
                                </button>
                            </>
                        )}
                    </th>
                    {/* <th>
                        <button
                            onClick={() => {
                                banHandler(userData);
                                navigate(``);
                            }}
                            className="btn btn-warning btn-xs"
                            disabled={userData.role==="admin"}
                        >
                            Ban
                        </button>
                    </th> */}
                </tr>
            </tbody>
        </>
    );
}
