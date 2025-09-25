import React from "react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    const linkClass = "block py-2 px-4 rounded hover:bg-emerald-600 transition"
    const activeClass = "bg-emerald-700 text-white font-semibold"

    return (
        <div className="w-full sm:w-44 h-auto sm:h-screen bg-emerald-800 text-white p-4 overflow-auto">
            <nav className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        isActive ? `${linkClass} ${activeClass}` : linkClass
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/dashboard/income"
                    className={({ isActive }) =>
                        isActive ? `${linkClass} ${activeClass}` : linkClass
                    }
                >
                    Income
                </NavLink>
                <NavLink
                    to="/dashboard/expense"
                    className={({ isActive }) =>
                        isActive ? `${linkClass} ${activeClass}` : linkClass
                    }
                >
                    Expense
                </NavLink>
            </nav>
        </div>
    )
}

export default Sidebar
