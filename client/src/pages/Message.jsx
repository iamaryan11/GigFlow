import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/api/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/api/messages`, message),
    onSuccess: () => queryClient.invalidateQueries(["messages", id]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageValue = e.target[0].value;
    if (!messageValue) return; // Don't send empty messages

    mutation.mutate({
      conversationId: id,
      desc: messageValue,
    });
    e.target[0].value = "";
  };

  return (
    <div className="flex justify-center pt-28 pb-10">
      <div className="container w-full max-w-4xl px-4 flex flex-col gap-6">
        <span className="text-slate-400 text-sm uppercase font-bold tracking-widest">
          Chat Room
        </span>

        <div className="h-[500px] overflow-y-auto p-8 bg-white rounded-3xl shadow-inner flex flex-col gap-4 border border-slate-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
               <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 font-medium">
              Error loading messages. Check if the route is mounted in server.js.
            </div>
          ) : (
            // FIX: Added optional chaining (?.) and a fallback empty array ([])
            (data || []).map((m) => (
              <div 
                key={m._id} 
                className={`flex gap-4 max-w-[80%] ${m.userId === currentUser?._id ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <div className={`p-4 rounded-2xl text-sm ${
                  m.userId === currentUser?._id 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-slate-100 text-slate-700 rounded-tl-none"
                }`}>
                  {m.desc}
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="border-slate-100" />
        
        <form onSubmit={handleSubmit} className="flex items-center justify-between gap-4">
          <textarea 
            placeholder="Write a message..." 
            className="textarea textarea-bordered w-full h-16 rounded-2xl resize-none"
          />
          <button 
            type="submit"
            disabled={mutation.isLoading}
            className="btn btn-primary h-16 px-10 rounded-2xl font-bold"
          >
            {mutation.isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;