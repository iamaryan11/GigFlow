import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, User as UserIcon } from "lucide-react";
import newRequest from "../utils/newRequest";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      // Store user info in localStorage for easy access across the app
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDE: Brand/Image Panel (Matches Register) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between text-white">
        <div>
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            GigFlow.
          </Link>
        </div>
        <div className="max-w-md">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Welcome <br /> Back.
          </h2>
          <p className="text-slate-400 text-lg">
            Log in to manage your gigs, chat with clients, and grow your business.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          © 2026 GigFlow Inc.
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-24 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12">
            <ArrowLeft size={18} /> Back to home
          </Link>

          <h1 className="text-4xl font-bold mb-2">Sign In</h1>
          <p className="text-slate-500 mb-10">
            New to GigFlow? <Link to="/register" className="text-primary font-semibold hover:underline">Create an account</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="form-control">
              <label className="label-text font-semibold mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon size={18} />
                </div>
                <input 
                  type="text" 
                  className="input input-bordered w-full pl-10 focus:input-primary" 
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <div className="flex justify-between items-center mb-2">
                <label className="label-text font-semibold">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  className="input input-bordered w-full pl-10 focus:input-primary" 
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full h-12 text-lg ${loading ? 'loading' : ''}`}
            >
              {loading ? "Authenticating..." : "Continue"}
            </button>
          </form>

          {/* Social Login Mockup */}
          <div className="divider my-8 text-slate-400 text-xs">OR CONTINUE WITH</div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-outline border-slate-200 hover:bg-slate-50 hover:border-slate-300">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google" />
              Google
            </button>
            <button className="btn btn-outline border-slate-200 hover:bg-slate-50 hover:border-slate-300">
              <img src="https://www.svgrepo.com/show/330412/facebook.svg" className="w-5 h-5 mr-2" alt="FB" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;