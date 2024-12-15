import { useState, useEffect } from "react";
import ApproveProduk from "../../components/containers/superadmin/ApproveProduk";
import KategoriProduk from "../../components/containers/superadmin/KategoriProduk";
import UserManagement from "../../components/containers/superadmin/User";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";
import { jwtDecode } from "jwt-decode";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
const DashboardSuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("produk");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useAuthCheck();
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    // Mendekode token untuk mendapatkan userId dan role
    const decodedToken = jwtDecode(token);
    decodedToken.userId;

    // Mengambil data lengkap user dari backend
    fetch(`${apiroutes}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, [token]);
  return (
    <>
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
    {/* Sidebar Navigasi */}
    <nav className="w-full md:w-64 bg-blue-600 text-white flex flex-col md:h-full">
      <h1 className="text-center text-2xl font-bold py-4 border-b border-blue-400">
        Super Admin Dashboard
      </h1>
      <ul className="flex-1">
        <li className="flex px-4 py-2 gap-2 items-center">
          {userData ? (
            <>
              <img
                className="w-16 h-16 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOG6E-AnifHE0PvMzIpCiDOZy1nWhJXXMZPg&s"
                alt="imgprofile"
              />
              <div>
                <h6 className="font-medium">{userData.name}</h6>
                <h6 className="font-medium">{userData.email}</h6>
              </div>
            </>
          ) : (
            <>
              <ion-icon size="large" name="refresh-outline"></ion-icon>
              <p>Mendapatkan data akun</p>
            </>
          )}
        </li>
        <li
          onClick={() => setActiveTab("produk")}
          className={`font-medium cursor-pointer px-4 py-2 ${activeTab === "produk" ? "bg-blue-800" : "hover:bg-blue-500"}`}
        >
          Manajemen Produk
        </li>
        <li
          onClick={() => setActiveTab("user")}
          className={`font-medium cursor-pointer px-4 py-2 ${activeTab === "user" ? "bg-blue-800" : "hover:bg-blue-500"}`}
        >
          Manajemen User
        </li>
        <li
          onClick={() => setActiveTab("kategori")}
          className={`font-medium cursor-pointer px-4 py-2 ${activeTab === "kategori" ? "bg-blue-800" : "hover:bg-blue-500"}`}
        >
          Manajemen Kategori Produk
        </li>
        <li
          onClick={handleLogout}
          className="font-medium cursor-pointer px-4 py-2 text-red-600 hover:bg-blue-500"
        >
          Logout
        </li>
      </ul>
    </nav>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "produk" && <ApproveProduk />}
          {activeTab === "user" && <UserManagement />}
          {activeTab === "kategori" && <KategoriProduk />}
        </div>
      </div>
    </>
  );
};

export default DashboardSuperAdmin;
