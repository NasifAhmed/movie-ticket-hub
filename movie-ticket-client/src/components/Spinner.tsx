import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Spinner({ condition }: { condition?: boolean }) {
    const [theme, setTheme] = useState();

    useEffect(() => {
        setTheme(window.document.documentElement.getAttribute("class") as any);
    }, []);

    return (
        <div className="flex justify-center items-center h-full w-full">
            {theme === "dark" ? (
                <ScaleLoader
                    color="white"
                    loading={condition}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <ScaleLoader
                    color="black"
                    loading={condition}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
        </div>
    );
}

export default Spinner;
