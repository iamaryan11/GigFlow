import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Gigs from "./pages/Gigs";
import Gig from "./pages/Gig";
import Dashboard from "./pages/Dashboard";
import Pay from "./pages/Pay";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages"; 
import Message from "./pages/Message";
import Add from "./pages/Add";
import Footer from "./components/Footer";
import MyGigs from "./pages/MyGigs";

const Layout = () => {
  const { pathname } = useLocation();
  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(pathname);
  return (
    <div className="app">
      {!isAuthPage && <Navbar />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }, 
      { path: "/gigs", element: <Gigs /> }, 
      { path: "/gig/:id", element: <Gig /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/pay/:id", 
        element: <Pay />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      { path: "/add", element: <Add /> },

      {
        path: "/messages", 
        element: <Messages />,
      },
      {
        path: "/message/:id", 
        element: <Message />,
      },
      {
        path: "/mygigs", 
        element: <MyGigs />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
