// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            {/* Navbar */}
            <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="FinTrack Logo" className="h-10 w-10" />
                    <span className="text-2xl font-bold text-emerald-600 tracking-wide">TrackIt</span>
                </div>
                <div className="space-x-4 text-gray-700 font-medium">
                    <Link
                        to="/"
                        className="hover:text-emerald-600 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/signup"
                        className="border border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-500 px-4 py-2 rounded-lg transition"
                    >
                        SignUp
                    </Link>
                    <button className="border border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-500 px-4 py-2 rounded-lg transition">
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero / Intro Section */}
            <section className="flex flex-1 flex-col items-center justify-center text-center px-6 pt-32">
                <img
                    src="bg1.jpg"
                    className="absolute inset-0 w-full h-full object-cover  blur-[1px]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Text*/}
                <div className="relative z-10 max-w-2xl ml-[-120px]">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-6">
                        Simplify Your Spending, Maximize Your Savings
                    </h2>
                    <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl">
                        Manage your income, expenses, and savings all in one place.
                        Simple, fast, and stress-free finance tracking for everyone.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/signup"
                            className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-xl font-semibold shadow transition"
                        >SignUp
                        </Link>
                        <button className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-xl font-semibold shadow transition">
                            Login
                        </button>
                    </div>

                </div>


            </section>
        </div>
    );
};

export default Home;
