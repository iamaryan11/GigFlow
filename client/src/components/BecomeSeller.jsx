import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const BecomeSeller = () => {
  const navigate = useNavigate();

  const features = [
    "The freedom to work whenever you want.",
    "A world of customers at your fingertips.",
    "Support from our community and 24/7 help desk.",
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -mr-32 -mt-32"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-16 relative z-10">

          {/* Letf side: Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Ready to turn your <br />
              <span className="text-indigo-400 italic">skills</span> into a
              career?
            </h2>

            <ul className="space-y-4 inline-block lg:block text-left">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircle2
                    className="text-indigo-400 shrink-0"
                    size={20}
                  />
                  <span className="text-lg font-medium tracking-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30"
              >
                Become a Seller Today
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative group">
              {/* Main Image Frame */}
              <div className="aspect-square rounded-3xl overflow-hidden border-8 border-slate-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Success"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl -rotate-6 group-hover:rotate-0 transition-transform duration-500 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    ₹
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold leading-none">
                      Earnings
                    </p>
                    <p className="text-slate-500 text-xs">Updated just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
