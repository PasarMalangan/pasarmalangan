import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function SidebarPembeli() {
  const location = useLocation(); // Mendapatkan informasi route saat ini

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useAuthCheck();
  useEffect(() => {}, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserData(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      setError("Token tidak ditemukan, silakan login.");
      return;
    }

    // Mendekode token untuk mendapatkan userId dan role
    const decodedToken = jwtDecode(token);
    decodedToken.userId;

    // Mengambil data lengkap user dari backend
    fetch(`${apiroutes}/api/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setError(null);
      })
      .catch((error) =>
        console.error(error),
        setError("Terjadi kesalahan saat mengambil data pengguna.")
      );
  }, [token]);

  const isActive = (path) => location.pathname === path;
  console.log(userData);
  return (
    <aside className="w-[20%] h-full bg-gray-200 p-5 border-r-2 shadow-inner shadow-gray-300">
      <ul className="flex flex-col gap-10">
        <li className="flex items-center gap-5">
        {error && <div className="text-red-500">{error}</div>}
          {userData ? (
            <>
              <img
                className="w-16 h-16 rounded-full"
                src={userData.profilepict}
                alt="imgprofile"
              />
              <h6 className="text-xl font-medium">{userData.username}</h6>
            </>
          ) : (
            <>
              <ion-icon size="large" name="refresh-outline"></ion-icon>
              <p>Mendapatkan data akun</p>
            </>
          )}
        </li>
        <Link to="/dashboard/pembeli">
          <li
            className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
              isActive("/dashboard/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="person-outline"></ion-icon>
            <p>Akun</p>
          </li>
        </Link>
        <Link to="/wishlist/pembeli">
          <li
            className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
              isActive("/wishlist/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="bookmark-outline"></ion-icon>
            <p>Wishlist</p>
          </li>
        </Link>
        <Link to="/pengaturan/pembeli">
          <li
            className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
              isActive("/pengaturan/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="settings-outline"></ion-icon>
            <p>Pengaturan Akun</p>
          </li>
        </Link>
        <Link to="/helpsupport">
          <li
            className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
              isActive("/helpsupport") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="help-circle-outline"></ion-icon>
            <p>Bantuan</p>
          </li>
        </Link>
        <button onClick={handleLogout}>
          <li className="flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out text-red-600">
            <ion-icon size="large" name="log-out-outline"></ion-icon>
            <p>Log Out</p>
          </li>
        </button>
      </ul>
    </aside>
  );
}
