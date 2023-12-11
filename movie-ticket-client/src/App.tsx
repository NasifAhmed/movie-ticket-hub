import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <div className="flex flex-col max-w-screen-lg mx-auto min-h-screen">
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
