import React, { useEffect, useRef } from "react"; // Added useEffect and useRef
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // Create a ref for the bottom of the chat
  const messagesEndRef = useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/api/messages`, message),
    onSuccess: () => queryClient.invalidateQueries(["messages", id]),
  });

  // Automatically scroll to bottom whenever data changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageValue = e.target[0].value;
    if (!messageValue) return;

    mutation.mutate({
      conversationId: id,
      desc: messageValue,
    });
    e.target[0].value = "";
  };

  return (
    /* Increased top padding to pt-32 to safely clear fixed navbars */
    <div className="flex justify-center pt-32 pb-10 min-h-screen bg-slate-50">
      <div className="container w-full max-w-4xl px-4 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm uppercase font-bold tracking-widest">
            Chat Room
          </span>
          <button className="btn btn-xs btn-ghost text-slate-400">
            Back to Messages
          </button>
        </div>

        {/* The Chat Box */}
        <div className="h-550px overflow-y-auto p-8 bg-white rounded-3xl shadow-xl flex flex-col gap-4 border border-slate-100 relative">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 font-medium">
              Error loading messages.
            </div>
          ) : (
            <>
              {(data || []).map((m) => (
                <div
                  key={m._id}
                  className={`flex gap-4 max-w-[80%] ${
                    m.userId === currentUser?._id
                      ? "self-end flex-row-reverse"
                      : "self-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm shadow-sm ${
                      m.userId === currentUser?._id
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-slate-100 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {m.desc}
                  </div>
                </div>
              ))}
              {/* This dummy div ensures the scroll-to-bottom works */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <hr className="border-slate-200" />

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-4 bg-white p-2 rounded-2xl shadow-lg border border-slate-100"
        >
          <textarea
            placeholder="Write a message..."
            className="textarea textarea-ghost focus:bg-transparent w-full h-16 rounded-2xl resize-none focus:outline-none"
          />
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="btn btn-primary h-14 px-10 rounded-xl font-bold"
          >
            {mutation.isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
