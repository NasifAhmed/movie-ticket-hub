import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import useAxios from "../Hooks/useAxios";
import Spinner from "../components/Spinner";
import TicketRow from "../components/TicketRow";
import { UserContext } from "../providers/UserProvider";
import { Show, Ticket } from "../types";

export default function MyShows() {
    const axios = useAxios();
    const { userFromDB } = useContext(UserContext);
    const ticketResponse = useQuery({
        queryKey: ["show"],
        queryFn: async (): Promise<Ticket[] | null> => {
            try {
                const res = await axios.get(`/ticket?user=${userFromDB?._id}`);
                return res.data;
            } catch (error) {
                console.log(`Error while fetching show data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            <Helmet>
                <title>My Shows | Movie Ticket Hub</title>
            </Helmet>
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
