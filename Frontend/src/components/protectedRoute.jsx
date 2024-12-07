import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 

  // Jika token ada, redirect ke halaman dashboard sesuai dengan role pengguna
  if (token) {
    if (userRole === "pembeli") {
      return <Navigate to="/dashboard/pembeli" />;
    }
    if (userRole === "pedagang") {
      return <Navigate to="/dashboard/pedagang" />;
    }
    if (userRole === "superadmin") {
      return <Navigate to="/dashboard/superadmin" />;
    }
  }

  return children;
};
const ProtectedDashboardRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { ProtectedAuthRoute, ProtectedDashboardRoute };
