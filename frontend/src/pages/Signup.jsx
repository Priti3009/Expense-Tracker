import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null)
  const [message, setMessage] = useState("");

  //handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //handle file input(Profile Picture)
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!profilePicture) {
        setMessage("Profile picture is required")
        return;
      }
      const data = new FormData();
      data.append("name", formData.name)
      console.log(formData.name)
      data.append("email", formData.email);
      console.log(formData.email)
      data.append("password", formData.password);
      console.log(formData.password)
      data.append("profilePicture", profilePicture);
      console.log(profilePicture)

      const res = await api.post("/v1/users/register", data, { withCredentials: true }, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setMessage(res.data.message || "User registered successfully !")
      setFormData({ name: "", email: "", password: "" })
      setProfilePicture(null);

      setTimeout(() => {
        navigate("/login")

      }, 1500);

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed")

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <nav className="w-full bg-emerald-700 shadow-md py-4 px-6 flex justify-between items-center fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FinTrack Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-white tracking-wide">TrackIt</span>
        </div>
        <div className="space-x-4 text-white font-medium">
          <Link
            to="/"
            className="hover:text-emerald-500 transition"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
          Sign Up
        </h2>

        {message && (
          <p className="text-center text-sm mb-4 text-red-500">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

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

          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Signup