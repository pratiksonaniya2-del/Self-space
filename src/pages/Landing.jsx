import { useNavigate } from "react-router-dom";
import { Shield, Lock, MessageCircle } from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px]" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-600 opacity-30 blur-[180px]" />
      </div>


      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        <div className="mb-10">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
            <MessageCircle size={45} />
          </div>
        </div>


        <h1 className="text-6xl md:text-7xl font-black text-center leading-tight">
          SelfSpace
        </h1>


        <p className="text-gray-400 text-center mt-6 text-xl md:text-2xl max-w-3xl leading-relaxed">
          Your private AI companion for thoughts, emotions, journaling,
          conversations and self-reflection.
        </p>


        <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <Shield className="text-purple-400 mb-5" size={40} />

            <h2 className="text-2xl font-bold mb-3">100% Private</h2>

            <p className="text-gray-400 leading-relaxed">
              Your conversations stay protected and secure. Nobody can access
              your personal thoughts.
            </p>
          </div>


          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <Lock className="text-blue-400 mb-5" size={40} />

            <h2 className="text-2xl font-bold mb-3">Encrypted Chats</h2>

            <p className="text-gray-400 leading-relaxed">
              Even developers cannot read your messages. Your data belongs only
              to you.
            </p>
          </div>


          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <MessageCircle className="text-pink-400 mb-5" size={40} />

            <h2 className="text-2xl font-bold mb-3">AI Companion</h2>

            <p className="text-gray-400 leading-relaxed">
              Talk freely, express emotions, and get thoughtful AI responses
              anytime.
            </p>
          </div>
        </div>


        <div className="flex flex-col gap-5 mt-16 w-full max-w-xl">
          <button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-5 rounded-2xl text-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Create Your Private Space
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="bg-white/5 border border-white/10 backdrop-blur-xl py-5 rounded-2xl text-2xl hover:bg-white/10 transition-all duration-300"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
