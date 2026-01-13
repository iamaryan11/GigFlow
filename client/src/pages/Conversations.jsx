import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import moment from "moment";
import { Mail, MailOpen } from "lucide-react";

const Conversations = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["conversations"]),
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-black text-slate-900 mb-10">Messages</h1>
        
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <table className="table w-full">
              <thead>
                <tr className="bg-slate-900 text-white h-16">
                  <th className="pl-8 uppercase text-xs tracking-widest">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th className="uppercase text-xs tracking-widest">Last Message</th>
                  <th className="uppercase text-xs tracking-widest">Date</th>
                  <th className="uppercase text-xs tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr 
                    key={c.id} 
                    className={`hover:bg-slate-50 transition-colors ${
                      ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && "bg-primary/5 font-bold"
                    }`}
                  >
                    <td className="pl-8 py-5 text-slate-700">
                      {currentUser.isSeller ? c.buyerId : c.sellerId}
                    </td>
                    <td>
                      <Link to={`/message/${c.id}`} className="text-slate-500 hover:text-primary transition-colors">
                        {c.lastMessage?.substring(0, 40)}...
                      </Link>
                    </td>
                    <td className="text-slate-400 text-sm">{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) ? (
                        <button onClick={() => handleRead(c.id)} className="btn btn-sm btn-primary rounded-full">
                          Mark as Read
                        </button>
                      ) : (
                        <MailOpen className="text-slate-300" size={20} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;