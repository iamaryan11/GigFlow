import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import {
  LucideIndianRupee,
  ShoppingBag,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["sellerStats"],
    queryFn: () => newRequest.get("/api/users/stats").then((res) => res.data),
  });
  console.log(data);
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-10">
        <header>
          <h1 className="text-3xl font-black text-slate-900">
            Seller Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your freelance business at a glance.
          </p>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">
                Total Revenue
              </p>
              <h2 className="text-4xl font-black text-slate-900">
                ₹{data?.totalRevenue}
              </h2>
            </div>
            <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
              <LucideIndianRupee size={32} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">
                Total Orders
              </p>
              <h2 className="text-4xl font-black text-slate-900">
                {data?.totalSales}
              </h2>
            </div>
            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
              <ShoppingBag size={32} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">
                Active Gigs
              </p>
              <h2 className="text-4xl font-black text-slate-900">
                {data?.statusPending}
              </h2>
            </div>
            <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
              <LayoutGrid size={32} />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between items-start space-y-6">
            <h3 className="text-2xl font-bold">Ready to grow?</h3>
            <p className="text-slate-400">
              Create a new gig to reach more buyers and increase your monthly
              revenue.
            </p>
            <Link to="/add" className="btn btn-primary rounded-full px-8 gap-2">
              Create New Gig <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between items-start space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Manage Orders</h3>
            <p className="text-slate-500">
              Track your current deliveries and communicate with your active
              clients.
            </p>
            <Link to="/orders" className="btn btn-outline rounded-full px-8">
              View Active Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
