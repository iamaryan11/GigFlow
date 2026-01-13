import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { MessageSquare, Package, User } from "lucide-react";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/api/orders`).then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId; // Unique conversation ID logic

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-900">Your Orders</h1>
          <div className="badge badge-primary p-4 gap-2 font-bold">
            <Package size={16} /> {data?.length || 0} Total
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">Error loading orders.</div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-slate-900 text-white border-none">
                <tr className="h-16">
                  <th className="pl-8 uppercase text-xs tracking-widest">Image</th>
                  <th className="uppercase text-xs tracking-widest">Title</th>
                  <th className="uppercase text-xs tracking-widest">Price</th>
                  <th className="uppercase text-xs tracking-widest">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th className="pr-8 uppercase text-xs tracking-widest">Contact</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {data.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="pl-8 py-4">
                      <img
                        className="w-16 h-10 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                        src={order.img || "/img/noavatar.jpg"}
                        alt=""
                      />
                    </td>
                    <td className="font-bold text-slate-700">{order.title}</td>
                    <td className="text-slate-500 font-medium">${order.price}</td>
                    <td>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                           <User size={14} />
                         </div>
                         <span className="text-sm font-semibold text-slate-600 uppercase tracking-tight">
                            {currentUser.isSeller ? "Client" : "Pro Seller"}
                         </span>
                      </div>
                    </td>
                    <td className="pr-8">
                      <button 
                        onClick={() => handleContact(order)}
                        className="btn btn-circle btn-ghost text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <MessageSquare size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {data.length === 0 && (
              <div className="p-20 text-center space-y-4">
                <div className="text-slate-200 flex justify-center"><Package size={80} /></div>
                <p className="text-slate-400 text-lg font-medium">No orders found. Time to make some moves!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;