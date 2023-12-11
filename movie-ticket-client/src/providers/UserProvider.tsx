import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useQuery } from "react-query";
import useAxios from "../Hooks/useAxios";
import { User } from "../types";
export type userType = User;
type userContextValues = {
    userFromDB: userType | null;
    loading: boolean;
};

// Default values
const defaultUserState: userContextValues = {
    userFromDB: null,
    loading: true,
};

export const UserContext = createContext(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    const userDBQuery = useQuery({
        queryKey: ["userFromDB", authContext.user?.email],
        queryFn: async () => {
            const response = await axios.get<userType[]>(
                `/user?email=${authContext.user?.email}`
            );
            setLoading(false);
            return response.data;
        },
        enabled: !authContext.loading,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return (
        userDBQuery.data && (
            <UserContext.Provider
                value={{
                    userFromDB: userDBQuery.data[0],
                    loading,
                }}
            >
                {children}
            </UserContext.Provider>
        )
    );
};

export default UserProvider;
