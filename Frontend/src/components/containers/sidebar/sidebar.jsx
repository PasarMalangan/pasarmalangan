import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";
export default function Sidebar() {
  const location = useLocation(); // Mendapatkan informasi route saat ini

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); // Menambahkan state untuk error
  const token = localStorage.getItem("token");

  useAuthCheck();
  useEffect(() => {
    setIsLoggedIn(!!token); // Set isLoggedIn berdasarkan keberadaan token
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
      setError("Token tidak ditemukan, silakan login.");
      return;
    }

    // Mendekode token untuk mendapatkan userId dan role
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    // Mengambil data lengkap user dari backend
    fetch("http://localhost:5000/api/user/getuser", {
      headers: {
        Authorization: `Bearer ${token}`, // Mengirim token untuk otentikasi
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); // Menyimpan data user
        setError(null); // Reset error jika berhasil
      })
      .catch((error) =>
        setError("Terjadi kesalahan saat mengambil data pengguna.")
      );
  }, [token]); // Menambahkan token sebagai dependency untuk memastikan fetch dijalankan jika token berubah

  const isActive = (path) => location.pathname === path;
  console.log(userData);
  return (
    <aside className="w-[20%] h-full bg-gray-200 p-5 border-r-2 shadow-inner shadow-gray-300">
      <ul className="flex flex-col gap-10">
        <li className="flex items-center gap-5">
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
            className={`flex items-center text-xl gap-5 ${
              isActive("/dashboard/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="person-outline"></ion-icon>
            <p>Akun</p>
          </li>
        </Link>
        <Link to="/wishlist/pembeli">
          <li
            className={`flex items-center text-xl gap-5 ${
              isActive("/wishlist/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="bookmark-outline"></ion-icon>
            <p>Wishlist</p>
          </li>
        </Link>
        <Link to="/pengaturan/pembeli">
          <li
            className={`flex items-center text-xl gap-5 ${
              isActive("/pengaturan/pembeli") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="settings-outline"></ion-icon>
            <p>Pengaturan Akun</p>
          </li>
        </Link>
        <Link to="/helpsupport">
          <li
            className={`flex items-center text-xl gap-5 ${
              isActive("/helpsupport") ? "text-blue-600 font-medium" : ""
            }`}
          >
            <ion-icon size="large" name="help-circle-outline"></ion-icon>
            <p>Bantuan</p>
          </li>
        </Link>
        <button onClick={handleLogout}>
          <li className="flex items-center text-xl gap-5 text-red-600">
            <ion-icon size="large" name="log-out-outline"></ion-icon>
            <p>Log Out</p>
          </li>
        </button>
      </ul>
    </aside>
  );
}
