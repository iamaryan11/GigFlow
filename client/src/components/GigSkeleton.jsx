// components/GigSkeleton.jsx
const GigSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      {/* Image box */}
      <div className="bg-slate-200 h-48 w-full rounded-2xl"></div>

      <div className="flex items-center gap-2">
        {/* Profile circle */}
        <div className="bg-slate-200 h-8 w-8 rounded-full"></div>
        {/* Name bar */}
        <div className="bg-slate-200 h-4 w-24 rounded"></div>
      </div>

      {/* Title bars */}
      <div className="bg-slate-200 h-4 w-full rounded"></div>
      <div className="bg-slate-200 h-4 w-2/3 rounded"></div>

      {/* Price footer */}
      <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-4">
        <div className="bg-slate-200 h-4 w-12 rounded"></div>
        <div className="bg-slate-200 h-6 w-16 rounded"></div>
      </div>
    </div>
  );
};

export default GigSkeleton;
