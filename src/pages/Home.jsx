import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-3">SelfSpace</h1>

          <p className="text-zinc-400 text-center mb-10">
            A private space for your thoughts.
          </p>

          <button className="w-full bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            Create Account
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="w-full mt-4 border border-zinc-700 py-3 rounded-2xl font-semibold hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
