import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="flex flex-col sm:flex-row justify-between items-center bg-emerald-700 text-white px-4 sm:px-6 py-3 shadow-md">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <img src="/logo.png" alt="FinTrack Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold tracking-wide">TrackIt</span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base">Hello {user?.name} !</span>
                <img
                    src={user?.profilePicture || "/profile-default.png"}
                    alt="profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border"
                />
                <button
                    onClick={handleLogout}
                    className="ml-2 sm:ml-3 px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-sm sm:text-base"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
