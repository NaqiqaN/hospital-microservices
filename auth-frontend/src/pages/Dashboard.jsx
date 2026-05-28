import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      <div className="w-[260px] bg-white/5 border-r border-white/10 p-8">

        <h1 className="text-2xl font-bold mb-10">
          Chiron Hospital Dashboard
        </h1>

        <div className="space-y-5 text-gray-300">

          <p className="hover:text-cyan-400 cursor-pointer">
            Overview
          </p>

          <p className="hover:text-cyan-400 cursor-pointer">
            Doctors
          </p>

          <p className="hover:text-cyan-400 cursor-pointer">
            Patients
          </p>

          <p className="hover:text-cyan-400 cursor-pointer">
            Appointments
          </p>

        </div>

      </div>

      <div className="flex-1 p-12">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold">
              Chiron Hospital
            </h1>

            <p className="text-gray-400 mt-3">
              Secure JWT Authentication Active
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

        <div className="mt-12 grid grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-2">
              Active Token
            </h2>

            <p className="text-green-400 break-all text-sm">
              {token}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-2">
              Security
            </h2>

            <p className="text-cyan-400">
              JWT Enabled
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-2">
              Architecture
            </h2>

            <p className="text-purple-400">
              Microservices Ready
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;