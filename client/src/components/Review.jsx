import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Star } from "lucide-react";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users", review.userId],

    queryFn: () =>
      newRequest.get(`/api/users/${review.userId._id}`).then((res) => res.data),
    enabled: !!review.userId._id, // Only fetch if userId exists!
  });
  // ye to done fix
  return (
    <div className="flex flex-col gap-4 py-6 border-b border-slate-50 last:border-0">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Could not load user"
      ) : (
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={data?.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info">
            <span className="font-bold text-slate-900">{data?.username}</span>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-1">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        {Array(5 - review.star)
          .fill()
          .map((_, i) => (
            <Star key={i} size={16} className="text-slate-200" />
          ))}
      </div>

      <p className="text-slate-600 leading-relaxed">{review.desc}</p>

      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
        <span>Helpful?</span>
        <button className="hover:text-primary">Yes</button>
        <button className="hover:text-red-500">No</button>
      </div>
    </div>
  );
};

export default Review;
