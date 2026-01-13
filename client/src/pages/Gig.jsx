import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Reviews from "../components/Reviews";
import {
  Star,
  Clock,
  RotateCcw,
  Check,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // FIX 1: Defined currentUser globally within the component
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 1. Fetch Gig Data (Your original endpoint preserved)
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`buyer/gig/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  // 2. Fetch Seller Data (Your original endpoint preserved)
  const { isLoading: isLoadingUser, data: dataUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/api/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });
  const handleContact = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const sellerId = dataUser._id;
    const buyerId = currentUser._id;
    const conversationId = sellerId + buyerId;

    try {
      const res = await newRequest.get(
        `/api/conversations/single/${conversationId}`
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          const res = await newRequest.post(`/api/conversations`, {
            to: sellerId,
          });
          navigate(`/message/${res.data.id}`);
        } catch (postErr) {
          console.error("Failed to create conversation:", postErr);
        }
      } else {
        console.error("Something went wrong:", err);
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (error) return <div className="text-center py-40">Error loading gig.</div>;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-16">
        {/* LEFT COLUMN */}
        <div className="flex-2 space-y-10">
          <div className="flex gap-2 items-center text-xs font-bold text-slate-400 uppercase tracking-tighter">
            <span>GigFlow</span>
            <span>/</span>
            <span>{data?.cat}</span>
          </div>

          <h1 className="text-4xl font-black text-slate-900 leading-tight">
            {data?.title}
          </h1>

          <div className="flex items-center gap-4">
            <img
              src={dataUser?.img || "/noavatar.jpg"}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">
                {dataUser?.username}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">
                  {data?.starNumber > 0
                    ? Math.round(data.totalStars / data.starNumber)
                    : 0}
                </span>
                <span className="text-slate-400 text-xs font-normal">
                  ({data?.starNumber} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="carousel w-full rounded-3xl shadow-xl h-500px">
            {data.images?.map((img, i) => (
              <div
                key={i}
                id={`item${i}`}
                className="carousel-item w-full relative"
              >
                <img src={img} className="w-full object-cover" alt="gig" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#item${i === 0 ? data.images.length - 1 : i - 1}`}
                    className="btn btn-circle btn-ghost bg-black/20 text-white"
                  >
                    ❮
                  </a>
                  <a
                    href={`#item${i === data.images.length - 1 ? 0 : i + 1}`}
                    className="btn btn-circle btn-ghost bg-black/20 text-white"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-4">About This Gig</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {data?.desc}
            </p>
          </div>

          <Reviews gigId={id} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-slate-800">
                  {data?.shortTitle}
                </h3>
                <span className="text-3xl font-black text-primary">
                  ₹{data?.price}
                </span>
              </div>
              <p className="text-slate-500">{data?.shortDesc}</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <Clock size={20} className="text-primary" />{" "}
                  {data?.deliveryTime} Days Delivery
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <RotateCcw size={20} className="text-primary" />{" "}
                  {data?.revisionNumber} Revisions
                </div>
              </div>

              <div className="space-y-3">
                {data.features?.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-500"
                  >
                    <Check size={18} className="text-primary shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(`/pay/${id}`)}
                className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20"
              >
                Continue to Order
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <ShieldCheck size={14} /> 100% Secure Payment
              </div>
            </div>

            {/* Added a safeguard to hide Contact button from the gig owner */}
            {currentUser?._id !== data?.userId && (
              <button
                onClick={handleContact}
                className="btn btn-ghost w-full border border-slate-200 h-14 rounded-2xl gap-3"
              >
                <MessageSquare size={18} /> Contact Seller
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gig;
