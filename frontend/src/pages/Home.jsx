// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            {/* Navbar */}
            <nav className="w-full bg-emerald-700 shadow-md py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center fixed top-0 z-50">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <img src="/logo.png" alt="FinTrack Logo" className="h-10 w-10" />
                    <span className="text-2xl font-bold text-white tracking-wide">TrackIt</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-white font-medium">
                    <Link
                        to="/"
                        className="hover:text-emerald-500 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/signup"
                        className="border border-white hover:bg-emerald-600 hover:text-white text-white px-4 py-2 rounded-lg transition text-center"
                    >
                        SignUp
                    </Link>
                    <Link
                        to="/login"
                        className="border border-white hover:bg-emerald-600 hover:text-white text-white px-4 py-2 rounded-lg transition text-center"
                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Intro Section */}
            <section className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 relative">
                <img
                    src="bg1.jpg"
                    className="absolute inset-0 w-full h-full object-cover blur-[1px]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Text */}
                <div className="relative z-10 max-w-2xl sm:max-w-xl md:max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-6">
                        Simplify Your Spending, Maximize Your Savings
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8 max-w-full sm:max-w-xl mx-auto">
                        Manage your income, expenses, and savings all in one place.
                        Simple, fast, and stress-free finance tracking for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-xl font-semibold shadow transition text-center"
                        >
                            SignUp
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-xl font-semibold shadow transition text-center"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
