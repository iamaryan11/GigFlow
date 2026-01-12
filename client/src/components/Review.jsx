import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const Review = ({ review }) => {
  // Fetch reviewer info
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", review.userId],
    queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="py-8 border-b border-slate-100 space-y-4">
      {isLoading ? (
        <div className="skeleton h-20 w-full rounded-xl"></div>
      ) : (
        <div className="flex items-center gap-4">
          <img src={data?.img || "/noavatar.jpg"} className="w-12 h-12 rounded-full object-cover" alt="" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">{data?.username}</span>
            <span className="text-slate-400 text-sm">{data?.country}</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-1 text-amber-500">
        {[...Array(review.star)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
        <span className="text-sm font-bold ml-1">{review.star}</span>
      </div>

      <p className="text-slate-600 leading-relaxed italic">"{review.desc}"</p>

      <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
        <span>Helpful?</span>
        <button className="flex items-center gap-1 hover:text-primary"><ThumbsUp size={14}/> Yes</button>
        <button className="flex items-center gap-1 hover:text-red-500"><ThumbsDown size={14}/> No</button>
      </div>
    </div>
  );
};

export default Review;