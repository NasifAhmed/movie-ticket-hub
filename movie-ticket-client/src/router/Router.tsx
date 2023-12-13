import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchMovie from "../components/SearchMovie";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetails from "../pages/MovieDetails";
import MyShows from "../pages/MyShows";
import Register from "../pages/Register";
import ReviewShow from "../pages/ReviewShow";
import Reviews from "../pages/Reviews";
import Shows from "../pages/Shows";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";

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
            {
                path: "/movie-details/:id",
                element: <MovieDetails />,
            },
            {
                path: "/review/:id",
                element: <Reviews />,
            },
            {
                path: "/review-show/:id",
                element: <ReviewShow />,
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);
