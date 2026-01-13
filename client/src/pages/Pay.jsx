import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { CreditCard, ShieldCheck, Lock } from "lucide-react";

const Pay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const getGig = async () => {
      try {
        const res = await newRequest.get(`/buyer/gig/${id}`);
        setGig(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGig();
  }, [id]);

  const handleFakePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await newRequest.post(`/api/orders/${id}`);
      const { payment_intent } = res.data; 

      setTimeout(async () => {
        await newRequest.put("/api/orders", {
          payment_intent: payment_intent,
        });

        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.log(err);
      setProcessing(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Payment Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900">
            Secure Checkout
          </h2>
          <form onSubmit={handleFakePayment} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Card Number
              </label>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <CreditCard size={20} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="bg-transparent outline-none w-full"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input input-bordered w-full rounded-xl bg-slate-50"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="input input-bordered w-full rounded-xl bg-slate-50"
                  disabled
                />
              </div>
            </div>

            <button
              className={`btn btn-primary w-full h-14 text-lg mt-4 ${
                processing && "loading"
              }`}
              disabled={processing}
            >
              {processing ? "Verifying..." : `Pay ₹${gig.price} Now`}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-1">
              <Lock size={12} /> SSL Encrypted
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} /> PCI Compliant
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
              <img
                src={gig.cover}
                className="w-20 h-14 object-cover rounded-lg"
                alt=""
              />
              <div>
                <p className="font-bold line-clamp-1">{gig.title}</p>
                <p className="text-slate-400 text-sm">GigFlow Pro Service</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>Service Fee</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                <span>Total</span>
                <span>₹{gig.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
