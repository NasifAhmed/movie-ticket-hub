import { useQuery } from "react-query";
import useAxios from "../Hooks/useAxios";
import { Show } from "../types";
import ShowCard from "../components/ShowCard";
import Spinner from "../components/Spinner";

export default function Shows() {
    const axios = useAxios();

    const showResponse = useQuery({
        queryKey: ["show"],
        queryFn: async (): Promise<Show[] | null> => {
            try {
                const res = await axios.get("/show");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching show data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {showResponse.isLoading && (
                <Spinner condition={showResponse.isLoading} />
            )}
            <div className="grid grid-cols-2 place-content-center place-items-center gap-5">
                {showResponse.data &&
                    showResponse.data.map((show) => {
                        return <ShowCard showData={show} />;
                    })}
            </div>
        </>
    );
}
