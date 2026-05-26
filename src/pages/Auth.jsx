import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Mail, Lock, ShieldCheck, ArrowRight, User } from "lucide-react";

function Auth() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("https://https://self-space.onrender.com0/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/chat");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-6">
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-700 opacity-30 blur-[180px]" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-700 opacity-30 blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
              <ShieldCheck size={45} />
            </div>
          </div>

          <h1 className="text-6xl font-black text-center mt-10">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SelfSpace
            </span>
          </h1>

          <p className="text-center text-gray-400 text-xl mt-5">
            Your private AI companion. Always here for you.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 gap-4 mt-12">
            <User className="text-pink-400" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-none w-full text-lg"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 gap-4 mt-5">
            <Mail className="text-purple-400" />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-lg"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 gap-4 mt-5">
            <Lock className="text-blue-400" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-lg"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" />
              Remember me
            </label>

            <button className="text-purple-400 hover:text-purple-300">
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSignup}
            className="w-full mt-10 bg-gradient-to-r from-purple-500 to-blue-500 py-5 rounded-2xl text-2xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl"
          >
            Create Your Private Space
            <ArrowRight />
          </button>

          <p className="text-center text-gray-400 mt-8 text-lg">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-purple-400 cursor-pointer"
            >
              Sign in
            </span>
          </p>

          <div className="mt-12 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <ShieldCheck className="text-purple-400" size={35} />

            <div>
              <h2 className="text-lg font-semibold">Your data is encrypted</h2>

              <p className="text-gray-400">
                Not even developers can read your messages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
