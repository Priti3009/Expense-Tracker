import { useState } from "react";
import { useAuth } from "../utils/AuthContext.jsx";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData.email, formData.password); // calls AuthContext login
            setMessage("Login successful!");
            // redirect after login
            navigate("/dashboard");

        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed!");

        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
                    Login
                </h2>

                {message && (
                    <p className="text-center text-sm mb-4 text-red-500">{message}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-emerald-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default Login;