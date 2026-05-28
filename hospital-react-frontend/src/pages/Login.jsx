import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
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
          Chiron Hospital 
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

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

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-xl font-semibold hover:scale-[1.02] transition-all"
          >
            Login
          </button>

        </form>

        <p className="text-gray-300 mt-6 text-sm">
          No account?{" "}
          <Link
            to="/register"
            className="text-cyan-400"
          >
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;