import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchMovie from "../components/SearchMovie";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shows from "../pages/Shows";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import MyShows from "../pages/MyShows";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/add-show",
                element: (
                    <PrivateRoute>
                        <SearchMovie />
                    </PrivateRoute>
                ),
            },
            {
                path: "/shows",
                element: <Shows />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/my-shows",
                element: <MyShows />,
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);
