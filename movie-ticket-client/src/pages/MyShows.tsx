import { useQuery } from "react-query";
import useAxios from "../Hooks/useAxios";
import { Show, Ticket } from "../types";
import TicketRow from "../components/TicketRow";
import Spinner from "../components/Spinner";

export default function MyShows() {
    const axios = useAxios();
    const ticketResponse = useQuery({
        queryKey: ["show"],
        queryFn: async (): Promise<Ticket[] | null> => {
            try {
                const res = await axios.get("/ticket");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching show data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {ticketResponse.isLoading ? (
                <Spinner condition={ticketResponse.isLoading} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Title</th>
                                <th>Release Date</th>
                                <th>Scheduled Show Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <>
                            {ticketResponse.data &&
                                ticketResponse.data.map((ticket) => {
                                    return (
                                        <>
                                            {ticket.show ? (
                                                <TicketRow
                                                    showData={
                                                        ticket.show as Show
                                                    }
                                                />
                                            ) : (
                                                <Spinner
                                                    condition={
                                                        ticket.show === ""
                                                    }
                                                />
                                            )}
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
