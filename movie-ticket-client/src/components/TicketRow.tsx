import { useQuery } from "react-query";
import useAxiosTMDB from "../Hooks/useTMDB";
import { Movie, Show } from "../types";

export default function TicketRow({ showData }: { showData: Show }) {
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    const movieResponse = useQuery({
        queryKey: ["movies", showData._id],
        queryFn: async () => {
            const response = await axios
                .get<Movie>(`/movie/${showData.id}`)
                .then((res) => {
                    console.log(res.data);
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            return response;
        },
        enabled: !!showData._id,
    });
    return (
        <>
            {movieResponse.data && (
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img
                                            src={`${imagePrefix}${movieResponse.data.poster_path}`}
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </td>
                        <td>
                            <div className="font-bold">
                                {movieResponse.data.title}
                            </div>
                        </td>
                        <td>{movieResponse.data.release_date}</td>
                        <td>{showData.date}</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">
                                details
                            </button>
                        </th>
                    </tr>
                </tbody>
            )}
        </>
    );
}
