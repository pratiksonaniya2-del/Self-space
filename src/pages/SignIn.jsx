import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function SignIn() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  /* LOGIN FUNCTION */

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://https://self-space.onrender.com0/login",

        {
          email,
          password,
        }
      );

      console.log(response.data);

      /* SAVE TOKEN */

      localStorage.setItem(
        "token",
        response.data.token
      );

      /* REDIRECT */

      navigate("/chat");

    } catch (error) {

      console.log(error);

      alert(
        error.response.data.message
      );

    }

  };



  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-6">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-700 opacity-30 blur-[180px]" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-700 opacity-30 blur-[180px]" />

      </div>



      {/* CARD */}

      <div className="relative z-10 w-full max-w-2xl">

        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl">

          {/* LOGO */}

          <div className="flex justify-center">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">

              <ShieldCheck size={45} />

            </div>

          </div>



          {/* TITLE */}

          <h1 className="text-6xl font-black text-center mt-10">

            Welcome Back

          </h1>

          <p className="text-center text-gray-400 text-xl mt-5">

            Continue your private journey.

          </p>



          {/* EMAIL */}

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 gap-4 mt-12">

            <Mail className="text-purple-400" />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="bg-transparent outline-none w-full text-lg"
            />

          </div>



          {/* PASSWORD */}

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 gap-4 mt-5">

            <Lock className="text-blue-400" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="bg-transparent outline-none w-full text-lg"
            />

          </div>



          {/* BUTTON */}

          <button
            onClick={handleLogin}
            className="w-full mt-10 bg-gradient-to-r from-purple-500 to-blue-500 py-5 rounded-2xl text-2xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl"
          >

            Sign In

            <ArrowRight />

          </button>



          {/* CREATE ACCOUNT */}

          <p className="text-center text-gray-400 mt-8 text-lg">

            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/auth")}
              className="text-purple-400 cursor-pointer"
            >

              Create Account

            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default SignIn;