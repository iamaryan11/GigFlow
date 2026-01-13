// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../utils/newRequest";
// import Reviews from "../components/Reviews";
// import { Star, Clock, RotateCcw, Check, MessageSquare, ShieldCheck } from "lucide-react";

// const Gig = () => {
//   const { id } = useParams();

//   // 1. Fetch Gig Data
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["gig", id],
//     // queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
//     queryFn: () => newRequest.get(`buyer/gig/${id}`).then((res) => res.data),
//   });

//   const userId = data?.userId;

//   // 2. Fetch Seller Data (Only fires after Gig Data is loaded)
//   const {
//     isLoading: isLoadingUser,
//     data: dataUser,
//   } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
//     enabled: !!userId,
//   });


//   const handleOrder = async () => {
//   try {
//     // 1. Create the pending order
//     const res = await newRequest.post(`/orders/${id}`);
    
//     // 2. FOR NOW (Mocking): Immediately confirm it so it shows up in Orders.jsx
//     // In the future, this is where you'd redirect to Stripe
//     await newRequest.put("/orders", { 
//        payment_intent: "temporary_mock_" // This would match the ID from createOrder
//     });
    
//     navigate("/orders");
//   } catch (err) {
//     console.log(err);
//   }
// };


//   if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
//   if (error) return <div className="text-center py-40">Error loading gig.</div>;

//   return (
//     <div className="bg-white min-h-screen pt-24 pb-20">
//       <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-16">
        
//         {/* LEFT COLUMN: Gig Details */}
//         <div className="flex-2 space-y-10">
//           <div className="flex gap-2 items-center text-xs font-bold text-slate-400 uppercase tracking-tighter">
//             <span className="hover:text-primary cursor-pointer">GigFlow</span>
//             <span>/</span>
//             <span className="hover:text-primary cursor-pointer">{data.cat}</span>
//           </div>

//           <h1 className="text-4xl font-black text-slate-900 leading-tight">{data.title}</h1>

//           {/* Seller Header */}
//           <div className="flex items-center gap-4">
//             <img src={dataUser?.img || "/noavatar.jpg"} className="w-12 h-12 rounded-full object-cover" alt="" />
//             <div className="flex flex-col">
//               <span className="font-bold text-slate-900">{dataUser?.username}</span>
//               <div className="flex items-center gap-1 text-amber-500">
//                 <Star size={14} fill="currentColor" />
//                 <span className="text-sm font-bold">{Math.round(data.totalStars / data.starNumber) || 0}</span>
//                 <span className="text-slate-400 text-xs font-normal">({data.starNumber} reviews)</span>
//               </div>
//             </div>
//           </div>

//           {/* DaisyUI Carousel for Images */}
//           <div className="carousel w-full rounded-3xl shadow-xl h-500px">
//             {data.images?.map((img, i) => (
//               <div key={i} id={`item${i}`} className="carousel-item w-full relative">
//                 <img src={img} className="w-full object-cover" alt="gig" />
//                 <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//                   <a href={`#item${i === 0 ? data.images.length - 1 : i - 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❮</a> 
//                   <a href={`#item${i === data.images.length - 1 ? 0 : i + 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❯</a>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold border-b pb-4">About This Gig</h2>
//             <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{data.desc}</p>
//           </div>

//           {/* Seller Bio Card */}
//           <div className="border border-slate-100 p-8 rounded-3xl bg-slate-50/50 space-y-6">
//             <h2 className="text-2xl font-bold">About The Seller</h2>
//             <div className="flex items-center gap-6">
//               <img src={dataUser?.img || "/noavatar.jpg"} className="w-24 h-24 rounded-full object-cover shadow-md" alt="" />
//               <div className="space-y-1">
//                 <p className="text-xl font-bold">{dataUser?.username}</p>
//                 <p className="text-slate-500 italic">"{dataUser?.desc || "Professional freelancer at your service"}"</p>
//                 <button className="btn btn-outline btn-sm rounded-full mt-2">Contact Me</button>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
//               <div className="flex flex-col"><span className="text-slate-400 text-sm">From</span><span className="font-bold">{dataUser?.country}</span></div>
//               <div className="flex flex-col"><span className="text-slate-400 text-sm">Member since</span><span className="font-bold">2024</span></div>
//             </div>
//           </div>

//           <Reviews gigId={id} />
//         </div>

//         {/* RIGHT COLUMN: Sticky Order Panel */}
//         <div className="flex-1">
//           <div className="sticky top-28 space-y-6">
//             <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold text-xl text-slate-800">{data.shortTitle}</h3>
//                 <span className="text-3xl font-black text-primary">${data.price}</span>
//               </div>
//               <p className="text-slate-500">{data.shortDesc}</p>

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
//                   <Clock size={20} className="text-primary" /> {data.deliveryTime} Days Delivery
//                 </div>
//                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
//                   <RotateCcw size={20} className="text-primary" /> {data.revisionNumber} Revisions
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {data.features?.map((f) => (
//                   <div key={f} className="flex items-center gap-2 text-sm text-slate-500">
//                     <Check size={18} className="text-primary shrink-0" /> {f}
//                   </div>
//                 ))}
//               </div>

//               <button className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20">
//                 Continue to Order
//               </button>
              
//               <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase">
//                 <ShieldCheck size={14} /> 100% Secure Payment
//               </div>
//             </div>

//             <button className="btn btn-ghost w-full border border-slate-200 h-14 rounded-2xl gap-3">
//               <MessageSquare size={18} /> Contact Seller
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gig;


// import React from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../utils/newRequest";
// import Reviews from "../components/Reviews";
// import { Star, Clock, RotateCcw, Check, MessageSquare, ShieldCheck } from "lucide-react";
// // import Reviews from "../components/Reviews";

// const Gig = () => {
//   const { id } = useParams();

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const navigate = useNavigate(); // Initialize navigate

//   // 1. Fetch Gig Data
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["gig", id],
//     queryFn: () => newRequest.get(`buyer/gig/${id}`).then((res) => res.data),
//   });

//   const userId = data?.userId;

//   // 2. Fetch Seller Data
//   const {
//     isLoading: isLoadingUser,
//     data: dataUser,
//   } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => newRequest.get(`/api/users/${userId}`).then((res) => res.data),
//     enabled: !!userId,
//   });

//   // 3. Handle Order Logic
//   const handleOrder = async () => {
//     try {
//       // Create the pending order
//       const res = await newRequest.post(`/api/orders/${id}`);
      
//       // MOCKING: Confirming immediately for your dev testing
//       // In production, Stripe would handle this confirmation via webhooks
//       await newRequest.put("/api/orders", { 
//          payment_intent: "temporary_mock_" + Math.random() 
//       });
      
//       navigate("/orders");
//     } catch (err) {
//       console.log("Order Error:", err);
//     }
//   };

//   const handleContact = async () => {
//   const sellerId = dataUser._id;
//   const buyerId = currentUser._id;
//   const id = sellerId + buyerId;

//   try {
//     // Try to find if conversation exists
//     const res = await newRequest.get(`/api/conversations/single/${id}`);
//     navigate(`/api/message/${res.data.id}`);
//   } catch (err) {
//     if (err.response.status === 404) {
//       // If not, create a new one
//       const res = await newRequest.post(`/api/conversations`, {
//         to: sellerId,
//       });
//       navigate(`/message/${res.data.id}`);
//     }
//   }
// };

//   if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
//   if (error) return <div className="text-center py-40">Error loading gig.</div>;

//   return (
//     <div className="bg-white min-h-screen pt-24 pb-20">
//       <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-16">
        
//         {/* LEFT COLUMN */}
//         <div className="flex-2 space-y-10">
//           <div className="flex gap-2 items-center text-xs font-bold text-slate-400 uppercase tracking-tighter">
//             <span>GigFlow</span>
//             <span>/</span>
//             <span>{data.cat}</span>
//           </div>

//           <h1 className="text-4xl font-black text-slate-900 leading-tight">{data.title}</h1>

//           {/* Seller Header */}
//           <div className="flex items-center gap-4">
//             <img src={dataUser?.img || "/noavatar.jpg"} className="w-12 h-12 rounded-full object-cover" alt="" />
//             <div className="flex flex-col">
//               <span className="font-bold text-slate-900">{dataUser?.username}</span>
//               <div className="flex items-center gap-1 text-amber-500">
//                 <Star size={14} fill="currentColor" />
//                 <span className="text-sm font-bold">{Math.round(data.totalStars / data.starNumber) || 0}</span>
//                 <span className="text-slate-400 text-xs font-normal">({data.starNumber} reviews)</span>
//               </div>
//             </div>
//           </div>

//           {/* Carousel */}
//           <div className="carousel w-full rounded-3xl shadow-xl h-[500px]">
//             {data.images?.map((img, i) => (
//               <div key={i} id={`item${i}`} className="carousel-item w-full relative">
//                 <img src={img} className="w-full object-cover" alt="gig" />
//                 <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//                   <a href={`#item${i === 0 ? data.images.length - 1 : i - 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❮</a> 
//                   <a href={`#item${i === data.images.length - 1 ? 0 : i + 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❯</a>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold border-b pb-4">About This Gig</h2>
//             <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{data.desc}</p>
//           </div>

// {/* #################################################### */}
//           <Reviews gigId={id} />
//         </div>

//         {/* RIGHT COLUMN: Sticky Order Panel */}
//         <div className="flex-1">
//           <div className="sticky top-28 space-y-6">
//             <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold text-xl text-slate-800">{data.shortTitle}</h3>
//                 <span className="text-3xl font-black text-primary">${data.price}</span>
//               </div>
//               <p className="text-slate-500">{data.shortDesc}</p>

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
//                   <Clock size={20} className="text-primary" /> {data.deliveryTime} Days Delivery
//                 </div>
//                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
//                   <RotateCcw size={20} className="text-primary" /> {data.revisionNumber} Revisions
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {data.features?.map((f) => (
//                   <div key={f} className="flex items-center gap-2 text-sm text-slate-500">
//                     <Check size={18} className="text-primary shrink-0" /> {f}
//                   </div>
//                 ))}
//               </div>

//               {/* LINKED THE BUTTON HERE */}
//               <button 
//                onClick={() => navigate(`/pay/${id}`)}
//                 className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20"
//               >
//                 Continue to Order
//               </button>
              
//               <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase">
//                 <ShieldCheck size={14} /> 100% Secure Payment
//               </div>
//             </div>

//             <button onClick={handleContact} className="btn btn-ghost w-full border border-slate-200 h-14 rounded-2xl gap-3">
//               <MessageSquare size={18} /> Contact Seller
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gig;



import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Reviews from "../components/Reviews";
import { Star, Clock, RotateCcw, Check, MessageSquare, ShieldCheck } from "lucide-react";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // FIX 1: Defined currentUser globally within the component
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 1. Fetch Gig Data (Your original endpoint preserved)
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`buyer/gig/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  // 2. Fetch Seller Data (Your original endpoint preserved)
  const {
    isLoading: isLoadingUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/api/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  const handleContact = async () => {
  if (!currentUser) return navigate("/login");

  const sellerId = dataUser._id;
  const buyerId = currentUser._id;
  const conversationId = sellerId + buyerId;

  try {
    const res = await newRequest.get(`/api/conversations/single/${conversationId}`);
    navigate(`/message/${res.data.id}`);
  } catch (err) {
    // If it's a 404, it means the conversation doesn't exist yet
    if (err.response?.status === 404) {
      try {
        const res = await newRequest.post(`/api/conversations`, {
          // In your controller, make sure this logic matches (who is 'to')
          to: sellerId, 
        });
        navigate(`/message/${res.data.id}`);
      } catch (postErr) {
        console.error("Error creating conversation:", postErr);
      }
    } else {
      console.error("Error fetching conversation:", err);
    }
  }
};

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (error) return <div className="text-center py-40">Error loading gig.</div>;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN */}
        <div className="flex-[2] space-y-10">
          <div className="flex gap-2 items-center text-xs font-bold text-slate-400 uppercase tracking-tighter">
            <span>GigFlow</span>
            <span>/</span>
            <span>{data?.cat}</span>
          </div>

          <h1 className="text-4xl font-black text-slate-900 leading-tight">{data?.title}</h1>

          <div className="flex items-center gap-4">
            <img src={dataUser?.img || "/noavatar.jpg"} className="w-12 h-12 rounded-full object-cover" alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">{dataUser?.username}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">
                    {data?.starNumber > 0 ? Math.round(data.totalStars / data.starNumber) : 0}
                </span>
                <span className="text-slate-400 text-xs font-normal">({data?.starNumber} reviews)</span>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="carousel w-full rounded-3xl shadow-xl h-[500px]">
            {data.images?.map((img, i) => (
              <div key={i} id={`item${i}`} className="carousel-item w-full relative">
                <img src={img} className="w-full object-cover" alt="gig" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#item${i === 0 ? data.images.length - 1 : i - 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❮</a> 
                  <a href={`#item${i === data.images.length - 1 ? 0 : i + 1}`} className="btn btn-circle btn-ghost bg-black/20 text-white">❯</a>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-4">About This Gig</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{data?.desc}</p>
          </div>

          <Reviews gigId={id} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-slate-800">{data?.shortTitle}</h3>
                <span className="text-3xl font-black text-primary">${data?.price}</span>
              </div>
              <p className="text-slate-500">{data?.shortDesc}</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <Clock size={20} className="text-primary" /> {data?.deliveryTime} Days Delivery
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <RotateCcw size={20} className="text-primary" /> {data?.revisionNumber} Revisions
                </div>
              </div>

              <div className="space-y-3">
                {data.features?.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-500">
                    <Check size={18} className="text-primary shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate(`/pay/${id}`)}
                className="btn btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20"
              >
                Continue to Order
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <ShieldCheck size={14} /> 100% Secure Payment
              </div>
            </div>

            {/* Added a safeguard to hide Contact button from the gig owner */}
            {currentUser?._id !== data?.userId && (
                <button onClick={handleContact} className="btn btn-ghost w-full border border-slate-200 h-14 rounded-2xl gap-3">
                    <MessageSquare size={18} /> Contact Seller
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gig;