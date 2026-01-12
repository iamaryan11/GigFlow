import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Review from "./Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  // 1. Fetch all reviews for this gig
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // 2. Mutation for adding a new review
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
    e.target[0].value = "";
  };

  return (
    <div className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold">Reviews</h2>
      
      {isLoading ? (
        "Loading reviews..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      {/* Add Review Form */}
      <div className="bg-slate-50 p-8 rounded-3xl mt-12 border border-dashed border-slate-200">
        <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            placeholder="Share your experience with this seller..." 
            className="textarea textarea-bordered w-full h-32"
            required
          />
          <div className="flex items-center gap-4">
            <select className="select select-bordered w-full max-w-xs font-bold">
              <option value={1}>1 Star (Poor)</option>
              <option value={2}>2 Stars (Fair)</option>
              <option value={3}>3 Stars (Good)</option>
              <option value={4}>4 Stars (Very Good)</option>
              <option value={5} selected>5 Stars (Excellent)</option>
            </select>
            <button className="btn btn-primary px-10" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Posting..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;