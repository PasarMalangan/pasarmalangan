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
import DetailProduk from "./pages/produk.jsx";
import DetailToko from "./pages/toko.jsx";

import {
  ProtectedAuthRoute,
  ProtectedDashboardRoute,
} from "./components/protectedRoute.jsx";
import Marketplace from "./pages/marketplace.jsx";
import DashboardPembeli from "./pages/pembeli/dashboardPembeli.jsx";
import Wishlist from "./pages/pembeli/wishlist.jsx";
import SettingsPembeli from "./pages/pembeli/settingspembeli.jsx";

import SettingsPedagang from "./pages/pedagang/settingsPedagang.jsx";
import ProductList from "./pages/pedagang/productslist.jsx";
import CreateProduct from "./pages/pedagang/createProduct.jsx";
import EditProduct from "./pages/pedagang/editProduct.jsx";

import DashboardSuperAdmin from "./pages/dashboardAdmin/dashboard.jsx";
import Comingsoon from "./pages/comingsoon.jsx";
import DashboardPedagang from "./pages/pedagang/dashboardpedagang.jsx";
import HelpAndSupport from "./pages/helpsupport.jsx";

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
    path: "/service",
    element: <Comingsoon />,
  },
  {
    path: "/helpsupport",
    element: <HelpAndSupport />,
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
        <SettingsPembeli />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/dashboard/pedagang",
    element: (
      <ProtectedDashboardRoute>
        <DashboardPedagang />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/pengaturan/pedagang",
    element: (
      <ProtectedDashboardRoute>
        <SettingsPedagang />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/products/pedagang",
    element: (
      <ProtectedDashboardRoute>
        <ProductList />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/products/create",
    element: (
      <ProtectedDashboardRoute>
        <CreateProduct />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/products/edit/:id",
    element: (
      <ProtectedDashboardRoute>
        <EditProduct />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/dashboard/superadmin",
    element: (
      <ProtectedDashboardRoute>
        <DashboardSuperAdmin />
      </ProtectedDashboardRoute>
    ),
  },
  {
    path: "/detailproduk/:id",
    element: <DetailProduk />,
  },
  {
    path: "/tokodetail/:id",
    element: <DetailToko />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
