import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
            <Helmet>
                <title>Home | Movie Ticket Hub</title>
            </Helmet>
            <div className="flex flex-col max-w-screen-xl mx-auto min-h-screen">
                <NavBar />
                <div className="flex-grow h-full w-full">
                    <Outlet />
                </div>
                <Footer />
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
