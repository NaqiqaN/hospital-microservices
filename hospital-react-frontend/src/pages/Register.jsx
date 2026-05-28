import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "PATIENT",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      setMessage(response.data);

      if (response.data === "User registered successfully") {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }

    } catch (err) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">

      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[180px] opacity-20 top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[180px] opacity-20 bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]"
      >

        <h1 className="text-4xl font-bold mb-2 text-white">
          Create Account
        </h1>

        <p className="text-gray-300 mb-8">
          Hospital Enterprise Access
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          >
            <option value="PATIENT">PATIENT</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {message && (
            <p className="text-cyan-400 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-xl font-semibold hover:scale-[1.02] transition-all"
          >
            Register
          </button>

        </form>

        <p className="text-gray-300 mt-6 text-sm">
          Already have account?{" "}
          <Link
            to="/"
            className="text-cyan-400"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Register;