import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();    //AuthProvider 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="flex justify-between items-center bg-emerald-700 text-white px-6 py-3 shadow-md">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="FinTrack Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold text-white-600 tracking-wide">TrackIt</span>
            </div>

            <div className="flex items-center gap-3">
                <span>Hello {user?.name} !</span>
                <img
                    src={user?.profilePicture || "/profile-default.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border"
                />
                <button
                    onClick={handleLogout}
                    className="ml-3 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};
export default Navbar;