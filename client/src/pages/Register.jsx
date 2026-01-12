import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { ArrowLeft, UploadCloud } from "lucide-react";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", { ...user, img: url });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDE: Brand/Image Panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between text-white">
        <div>
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            GigFlow.
          </Link>
        </div>
        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Join the world's most <br /> specialized marketplace.
          </h2>
          <p className="text-slate-400 text-lg">Over 3 million freelancers are waiting to help you scale your business.</p>
        </div>
        <div className="flex gap-4 text-sm text-slate-500">
          <span>© 2026 GigFlow Inc.</span>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 overflow-y-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={18} /> Back to home
        </Link>

        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-slate-500 mb-8">Already have an account? <Link to="/login" className="text-primary font-semibold">Login here</Link></p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-semibold mb-2">Username</label>
                <input name="username" type="text" className="input input-bordered w-full" placeholder="johndoe" onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label-text font-semibold mb-2">Country</label>
                <input name="country" type="text" className="input input-bordered w-full" placeholder="USA" onChange={handleChange} />
              </div>
            </div>

            <div className="form-control">
              <label className="label-text font-semibold mb-2">Email Address</label>
              <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" onChange={handleChange} required />
            </div>

            <div className="form-control">
              <label className="label-text font-semibold mb-2">Password</label>
              <input name="password" type="password" className="input input-bordered w-full" onChange={handleChange} required />
            </div>

            <div className="form-control">
              <label className="label-text font-semibold mb-2">Profile Picture</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <UploadCloud className="text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">{file ? file.name : "Click to upload avatar"}</span>
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">Become a Seller</h4>
                  <p className="text-xs text-slate-500">Sell your services to global clients</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" onChange={handleSeller} />
              </div>
              
              {user.isSeller && (
                <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                   <input name="phone" type="text" className="input input-sm input-bordered w-full" placeholder="Phone Number" onChange={handleChange} />
                   <textarea name="desc" className="textarea textarea-bordered w-full h-20" placeholder="A brief description of your skills..." onChange={handleChange}></textarea>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full h-12">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;