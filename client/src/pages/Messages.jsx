import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // 1. Fetch all conversations
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`api/conversations`).then((res) => res.data),
  });

  // 2. Mutation to mark a message as read
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`api/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const UsernameDisplay = ({ userId }) => {
    const { data, isLoading } = useQuery({
      queryKey: ["user", userId],
      queryFn: () =>
        newRequest.get(`/api/users/${userId}`).then((res) => res.data),
    });

    if (isLoading)
      return <span className="skeleton h-4 w-20 inline-block"></span>;
    return <span>{data?.username || "Unknown User"}</span>;
  };

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container max-w-6xl px-4">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">
            Something went wrong!
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black text-slate-900">Messages</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <table className="table w-full border-collapse">
                {/* Table Head */}
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="py-5 px-6 text-left uppercase tracking-widest text-xs font-bold">
                      {currentUser.isSeller ? "Buyer" : "Seller"}
                    </th>
                    <th className="py-5 px-6 text-left uppercase tracking-widest text-xs font-bold">
                      Username
                    </th>
                    <th className="py-5 px-6 text-left uppercase tracking-widest text-xs font-bold">
                      Last Message
                    </th>
                    <th className="py-5 px-6 text-left uppercase tracking-widest text-xs font-bold">
                      Date
                    </th>
                    <th className="py-5 px-6 text-left uppercase tracking-widest text-xs font-bold">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">
                  {data.map((c) => {
                    const isUnread =
                      (currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer);
                    return (
                      <tr
                        key={c.id}
                        className={`transition-colors hover:bg-slate-50 ${
                          isUnread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        {console.log(c)}
                        <td className="py-5 px-6 font-bold text-slate-700">
                          {/* Slice the ID for cleaner look if username isn't available */}
                          User{" "}
                          {currentUser.isSeller
                            ? c.buyerId.substring(0, 8)
                            : c.sellerId.substring(0, 8)}
                        </td>
                        <td className="py-5 px-6 font-bold text-slate-700">
                          <UsernameDisplay
                            userId={
                              currentUser.isSeller ? c.buyerId : c.sellerId
                            }
                          />
                        </td>
                        <td className="py-5 px-6">
                          <Link
                            to={`/message/${c.id}`}
                            className="text-slate-600 hover:text-primary transition-colors"
                          >
                            <p
                              className={`line-clamp-1 ${
                                isUnread ? "font-bold text-slate-900" : ""
                              }`}
                            >
                              {c.lastMessage || "No messages yet..."}
                            </p>
                          </Link>
                        </td>
                        <td className="py-5 px-6 text-slate-400 text-sm whitespace-nowrap">
                          {moment(c.updatedAt).fromNow()}
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            {isUnread && (
                              <button
                                onClick={() => handleRead(c.id)}
                                className="btn btn-primary btn-xs rounded-lg normal-case"
                              >
                                Mark as Read
                              </button>
                            )}
                            <Link
                              to={`/message/${c.id}`}
                              className="btn btn-ghost btn-xs text-slate-400 hover:text-primary"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {data?.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400">No conversations found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Messages;
