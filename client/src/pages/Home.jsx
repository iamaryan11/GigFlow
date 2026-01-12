import React from 'react';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import GigCard from "../components/GigCard";

const Home = () => {
  // TanStack Query for the "Server State"
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => newRequest.get("/gigs").then((res) => res.data),
  });

  const categories = [
    { name: "Graphics & Design", slug: "design" },
    { name: "Digital Marketing", slug: "marketing" },
    { name: "Writing & Translation", slug: "writing" },
    { name: "Video & Animation", slug: "video" },
    { name: "Programming & Tech", slug: "tech" },
  ];

  return (
    <div className="bg-base-100 min-h-screen">
     {/* 1. HERO SECTION */}
<div className="hero bg-slate-900 text-white py-20 px-4">
  {/* Added 'flex-col' and 'items-center' and removed 'justify-between' */}
  <div className="container mx-auto flex flex-col items-center text-center">
    <div className="max-w-2xl"> {/* Increased width slightly for centered look */}
      <h1 className="text-5xl font-bold leading-tight mb-6">
        Find the perfect <span className="italic font-light">freelance</span> services for your business
      </h1>
      
      {/* Centering the Search Bar */}
      <div className="join w-full max-w-md mx-auto"> 
        <input className="input input-bordered join-item w-full text-black" placeholder="Try 'building a website'" />
        <button className="btn btn-primary join-item">Search</button>
      </div>

      {/* Centering the Popular Tags */}
      <div className="mt-6 mb-6 flex flex-wrap gap-2 justify-center">
        <span className="text-sm opacity-70">Popular:</span>
        {['Web Design', 'WordPress', 'Logo Design', 'AI Services'].map(tag => (
          <button key={tag} className="badge badge-outline hover:bg-white hover:text-black cursor-pointer">{tag}</button>
        ))}
      </div>
    </div>

    {/* Optional: Hide the side image or move it below if you want a clean centered look */}
    <div className="hidden lg:block w-1/2">
  <img 
    src="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJlZUxhbmNpbmd8ZW58MHx8MHx8fDA%3D" 
    alt="Freelancers working" 
    className="rounded-2xl shadow-2xl object-cover h-80 w-full mx-auto"
  />
</div>
  </div>
</div>

      {/* 2. CATEGORY BAR (The "Pro" Touch) */}
      <div className="border-b border-base-200">
        <div className="container mx-auto px-4 flex gap-8 overflow-x-auto py-4 no-scrollbar">
          {categories.map((cat) => (
            <span key={cat.slug} className="whitespace-nowrap text-gray-500 hover:text-primary cursor-pointer font-medium transition-colors">
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* 3. GIG GRID */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Gigs</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="alert alert-error">Something went wrong. Please check your backend connection.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </div>
        )}
      </div>

      {/* 4. CTA SECTION (To stand out) */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-primary-content">
          <div>
            <h2 className="text-3xl font-bold mb-2">GigFlow business.</h2>
            <p className="text-lg opacity-90">A solution built for business. Upgrade to a curated experience.</p>
          </div>
          <button className="btn btn-secondary mt-6 md:mt-0">Explore Business</button>
        </div>
      </div>
    </div>
  );
};

export default Home;