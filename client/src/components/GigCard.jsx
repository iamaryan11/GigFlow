import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingBag } from "lucide-react"; 
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", item.userId],
    queryFn: () =>
      newRequest.get(`/api/users/${item.userId}`).then((res) => res.data),
  });

  const averageRating = Math.round(item.totalStars / item.starNumber) || 0;

  return (
    <Link to={`/gig/${item._id}`} className="no-underline">
      <div className="card w-full bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group rounded-2xl overflow-hidden">
        <figure className="relative h-52 overflow-hidden">
          <img
            src={item.cover}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <button
            className="absolute top-3 right-3 btn btn-circle btn-xs bg-white/80 border-none hover:bg-white hover:scale-110 transition-all shadow-md"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart
              size={14}
              className="text-slate-600 hover:text-red-500 transition-colors"
            />
          </button>
        </figure>

        <div className="card-body p-5 gap-1">
          <div className="flex items-center gap-3 mb-2">
            {isLoading ? (
              <div className="skeleton w-7 h-7 rounded-full shrink-0"></div>
            ) : (
              <div className="avatar">
                <div className="w-7 h-7 rounded-full ring-1 ring-slate-100 ring-offset-1">
                  <img src={data?.img || "/img/noavatar.jpg"} alt="seller" />
                </div>
              </div>
            )}
            <span className="text-sm font-bold text-slate-700 hover:text-primary transition-colors">
              {isLoading ? (
                <div className="skeleton h-4 w-20"></div>
              ) : (
                data?.username
              )}
            </span>
          </div>

          <h2 className="text-base text-slate-800 font-medium line-clamp-2 min-h-3rem group-hover:text-primary transition-colors leading-snug">
            {item.title}
          </h2>

          {/* Ratingg and sales Section */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-amber-400" fill="currentColor" />
              <span className="text-sm font-bold text-amber-500">
                {averageRating}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({item.starNumber})
              </span>
            </div>

            {/* new sale indicator */}
            {item.sales > 0 && (
              <div className="flex items-center gap-1 text-slate-400">
                <ShoppingBag size={12} />
                <span className="text-xs font-medium">{item.sales} sold</span>
              </div>
            )}
          </div>

          <div className="divider opacity-50 my-2"></div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
              Starting at
            </span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-slate-900">
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
