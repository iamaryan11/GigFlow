import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    // Close dropdown when clicking outside
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("scroll", isActive);
      document.removeEventListener("mousedown", handler);
    };
  }, []);


  // Fetch conversations to check for unread messages
const { data: convData } = useQuery({
  queryKey: ["conversations"],
  queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  enabled: !!currentUser, // Only fetch if logged in
});

const hasUnread = convData?.some((c) => 
  (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)
);

const handleLogout = async () => {
  try {
    await newRequest.post("/auth/logout");
  } catch (err) {
    console.log("Server logout failed, but clearing local session anyway.");
  } finally {
    // ALWAYS clear local storage and navigate, regardless of server error
    localStorage.setItem("currentUser", null);
    navigate("/");
  }
};

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        active || pathname !== "/"
          ? "bg-white text-black shadow-md py-2"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          GigFlow<span className="text-primary">.</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-primary hidden md:block">Explore</Link>
          <Link to="/" className="hover:text-primary hidden lg:block">English</Link>

          {/* BECOME A SELLER LOGIC */}
          {!currentUser?.isSeller && (
            <Link
              to={currentUser ? "/become-seller" : "/register"}
              className="hidden lg:block cursor-pointer hover:text-primary transition-colors"
            >
              Become a Seller
            </Link>
          )}


          {/* for chats */}
            <Link to="/messages" className="relative">
  Messages
  {hasUnread && (
    <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
  )}
</Link>
          {/* AUTH LOGIC */}
          {!currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-primary">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm rounded-md px-6">
                Join
              </Link>
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={currentUser.img || "/noavatar.jpg"}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                />
                <span className="hidden sm:block font-semibold">
                  {currentUser?.username}
                </span>
              </div>

              {/* DROPDOWN MENU */}
              {open && (
                <div className="absolute top-12 right-0 bg-white border border-slate-100 p-4 rounded-xl shadow-2xl flex flex-col gap-3 w-52 text-slate-600 font-normal animate-in fade-in zoom-in-95">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="hover:text-primary flex items-center gap-2 p-1" to="/mygigs" onClick={() => setOpen(false)}>
                        <span>📁</span> My Gigs
                      </Link>
                      <Link className="hover:text-primary flex items-center gap-2 p-1" to="/add" onClick={() => setOpen(false)}>
                        <span>➕</span> Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="hover:text-primary flex items-center gap-2 p-1" to="/orders" onClick={() => setOpen(false)}>
                    <span>📦</span> Orders
                  </Link>
                  <Link className="hover:text-primary flex items-center gap-2 p-1" to="/messages" onClick={() => setOpen(false)}>
                    <span>💬</span> Messages
                  </Link>
                  <hr className="border-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;