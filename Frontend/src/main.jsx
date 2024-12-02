import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import RegPembeli from "./pages/regPembeli.jsx";
import RegPedagang from "./pages/regPedagang.jsx";
import ErrorPage from "./pages/404.jsx";
import AboutUs from "./pages/about.jsx";
import {
  ProtectedAuthRoute,
  ProtectedDashboardRoute,
} from "./components/protectedRoute.jsx";
import Marketplace from "./pages/marketplace.jsx";
import DashboardPembeli from "./pages/pembeli/dashboardPembeli.jsx";
import Wishlist from "./pages/pembeli/wishlist.jsx";
import SettingsPembeli from "./pages/pembeli/settingspembeli.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/login",
    element: (
      <ProtectedAuthRoute>
        <Login />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedAuthRoute>
        <Register />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/register/pembeli",
    element: (
      <ProtectedAuthRoute>
        <RegPembeli />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/register/pedagang",
    element: (
      <ProtectedAuthRoute>
        <RegPedagang />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/dashboard/pembeli",
    element: (
      <ProtectedDashboardRoute>
        <DashboardPembeli />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/wishlist/pembeli",
    element: (
      <ProtectedDashboardRoute>
        <Wishlist />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/pengaturan/pembeli",
    element: (
      <ProtectedDashboardRoute>
        <SettingsPembeli/>
      </ProtectedDashboardRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
