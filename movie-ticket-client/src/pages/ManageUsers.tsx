import { useQuery } from "react-query";
import useAxios from "../Hooks/useAxios";
import Spinner from "../components/Spinner";
import UserRow from "../components/UserRow";
import { User } from "../types";

export default function ManageUsers() {
    const axios = useAxios();
    const userResponse = useQuery({
        queryKey: ["users", "manage"],
        queryFn: async (): Promise<User[] | null> => {
            try {
                const res = await axios.get(`/user`);
                return res.data;
            } catch (error) {
                console.log(`Error while fetching show data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {userResponse.isLoading ? (
                <Spinner condition={userResponse.isLoading} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <>
                            {userResponse.data &&
                                userResponse.data.map((user) => {
                                    return (
                                        <>
                                            <UserRow userData={user} />
                                        </>
                                    );
                                })}
                        </>
                    </table>
                </div>
            )}
        </>
    );
}
