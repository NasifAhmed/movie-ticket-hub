import { useNavigate } from "react-router-dom";
import { User } from "../types";

export default function UserRow({ userData }: { userData: User }) {
    const navigate = useNavigate();
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
                        <button
                            onClick={() => {
                                navigate(``);
                            }}
                            className="btn btn-primary btn-xs"
                        >
                            Make Admin
                        </button>
                    </th>
                    <th>
                        <button
                            onClick={() => {
                                navigate(``);
                            }}
                            className="btn btn-warning btn-xs"
                        >
                            Ban
                        </button>
                    </th>
                </tr>
            </tbody>
        </>
    );
}
