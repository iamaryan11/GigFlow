import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import GigCard from "../components/GigCard";
import { ChevronDown } from "lucide-react";
import GigSkeleton from "../components/GigSkeleton";
const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort], 
    queryFn: () => {
      const params = new URLSearchParams(search);
      if (minRef.current?.value) params.set("min", minRef.current.value);
      if (maxRef.current?.value) params.set("max", maxRef.current.value);
      params.set("sort", sort);
      return newRequest
        .get(`/view/gigs?${params.toString()}`)
        .then((res) => res.data);
    },
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Re-fetch when search URL or sorting changes
  useEffect(() => {
    refetch();
  }, [sort, search]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          GigFlow Marketplace
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-8">
          {new URLSearchParams(search).get("search")
            ? `Results for "${new URLSearchParams(search).get("search")}"`
            : new URLSearchParams(search).get("cat") || "Professional Services"}
        </h1>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
            <span>Budget:</span>
            <input
              ref={minRef}
              type="number"
              placeholder="Min"
              className="input input-sm input-bordered w-24 rounded-lg"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="Max"
              className="input input-sm input-bordered w-24 rounded-lg"
            />
            <button
              onClick={apply}
              className="btn btn-sm btn-primary px-6 rounded-lg"
            >
              Apply
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <div
              className="flex items-center gap-2 cursor-pointer font-bold text-slate-900"
              onClick={() => setOpen(!open)}
            >
              {sort === "sales" ? "Best Selling" : "Newest"}
              <ChevronDown
                size={18}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
            {open && (
              <div className="absolute top-10 right-0 p-4 bg-white shadow-2xl rounded-xl border border-slate-100 flex flex-col gap-4 w-40 z-10">
                <span
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => reSort("createdAt")}
                >
                  Newest
                </span>
                <span
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => reSort("sales")}
                >
                  Best Selling
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            [...Array(8)].map((_, i) => <GigSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-20 text-red-500 font-bold">
              Something went wrong!
            </div>
          ) : (
            data?.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>

        {!isLoading && data?.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-400">
              No gigs found matching your criteria.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
