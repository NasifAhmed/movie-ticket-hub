import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { UserContext } from "../providers/UserProvider";

export default function NavBar() {
    const { user, logOut } = useContext(AuthContext);
    const { userFromDB } = useContext(UserContext);

    function handlelogout() {
        logOut()
            .then(() => {
                console.log(`Logged out successfully`);
            })
            .catch((e: any) => {
                console.log(e);
            });
    }
    return (
        <div className="navbar bg-base-100 mb-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <NavLink
                                to="/"
                                className={"navbar transition-colors"}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shows"
                                className={"navbar transition-colors"}
                            >
                                Available Shows
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Movie Ticket Hub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/" className={"navbar transition-colors"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/shows"
                            className={"navbar transition-colors"}
                        >
                            Available Shows
                        </NavLink>
                    </li>
                    {userFromDB?.role === "admin" && (
                        <li>
                            <NavLink
                                to="/add-show"
                                className={"navbar transition-colors"}
                            >
                                Add Show
                            </NavLink>
                        </li>
                    )}
                    {userFromDB?.role === "user" && (
                        <li>
                            <NavLink
                                to="/my-shows"
                                className={"navbar transition-colors"}
                            >
                                My Shows
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <div className="mr-5">
                            <h1>{user.email}</h1>
                        </div>
                        <a onClick={handlelogout} className="btn">
                            Log Out
                        </a>
                    </>
                ) : (
                    <>
                        <a href="/login" className="btn">
                            Log In
                        </a>
                        <a href="/register" className="btn">
                            Register
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
