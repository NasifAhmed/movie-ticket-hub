import Banner from "../components/Banner";

export default function Home() {
    return (
        <div className="min-h-screen bg-base-200">
            {/* <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div> */}
            <h1 className="text-center font-bold text-4xl pt-10 mb-10">
                Buy tickets for movies you want to watch
            </h1>
            <h2 className="text-center font-bold text-2xl pt-10 mb-10">
                Available Shows
            </h2>
            <div className="hero">
                <Banner />
            </div>
        </div>
    );
}
