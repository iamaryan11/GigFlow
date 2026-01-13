import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Trash2, ExternalLink, Plus } from "lucide-react";

const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // 1. Fetch only MY gigs
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  // 2. Delete mutation
  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Gigs</h1>
            <p className="text-slate-500 font-medium">Manage and monitor your active services.</p>
          </div>
          <Link to="/add" className="btn btn-primary rounded-full px-6 gap-2">
            <Plus size={18} /> Add New Gig
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white h-16 border-none">
                  <th className="pl-8 uppercase text-xs tracking-widest font-bold">Image</th>
                  <th className="uppercase text-xs tracking-widest font-bold">Title</th>
                  <th className="uppercase text-xs tracking-widest font-bold">Price</th>
                  <th className="uppercase text-xs tracking-widest font-bold text-center">Sales</th>
                  <th className="uppercase text-xs tracking-widest font-bold text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr key={gig._id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <td className="pl-8 py-4">
                      <img
                        className="w-20 h-12 object-cover rounded-xl shadow-sm"
                        src={gig.cover}
                        alt=""
                      />
                    </td>
                    <td className="font-bold text-slate-700 max-w-xs truncate">
                      {gig.title}
                    </td>
                    <td className="text-slate-500 font-medium">${gig.price}</td>
                    <td className="text-center font-semibold text-slate-400">
                      {gig.sales || 0}
                    </td>
                    <td className="text-right pr-8">
                      <div className="flex justify-end gap-3">
                        <Link 
                          to={`/gig/${gig._id}`} 
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Gig"
                        >
                          <ExternalLink size={20} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(gig._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Gig"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {data.length === 0 && (
              <div className="p-20 text-center">
                <p className="text-slate-400 font-medium">You haven't posted any gigs yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;