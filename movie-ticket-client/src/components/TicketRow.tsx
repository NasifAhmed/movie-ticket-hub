import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useTMDB";
import { Movie, Show } from "../types";

export default function TicketRow({ showData }: { showData: Show }) {
    const { instance: axios, imagePrefix } = useAxiosTMDB();
    const navigate = useNavigate();
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
                            <button
                                onClick={() => {
                                    navigate(`/review/${showData._id}`);
                                }}
                                className="btn btn-ghost btn-xs"
                            >
                                Review
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    navigate(`/movie-details/${showData.id}`);
                                }}
                                className="btn btn-ghost btn-xs"
                            >
                                Details
                            </button>
                        </th>
                    </tr>
                </tbody>
            )}
        </>
    );
}
