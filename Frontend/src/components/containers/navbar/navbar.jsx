import { Link, useNavigate } from "react-router-dom";
import image from "../../../image";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";

export default function Navbar() {
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
    localStorage.removeItem("token"); // Hapus token dari localStorage
    localStorage.removeItem("role"); // Hapus role dari localStorage
    setIsLoggedIn(false);
    setUserData(null); // Reset userData saat logout
    navigate("/login"); // Redirect ke halaman login setelah logout
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

  return (
    <header className="w-full bg-blue-500 px-10 py-2">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img src={image.logo_header} alt="iconhome" />
        </Link>
        <ul className="flex gap-10 text-white">
          <li>
            <Link
              className="text-xl hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/"
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              className="text-xl hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/marketplace"
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link
              className="text-xl hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/service"
            >
              Layanan
            </Link>
          </li>
          <li>
            <Link
              className="text-xl hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/aboutus"
            >
              Tentang Kami
            </Link>
          </li>
        </ul>

        {/* Tampilkan tombol Login atau Logout berdasarkan status login */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-xl rounded-2xl border-[1.5px] shadow-2xl px-10 py-2 border-black bg-red-500 text-white font-semibold hover:bg-red-700 transition-colors duration-300 ease-out"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            className="text-xl rounded-2xl border-[1.5px] shadow-2xl px-10 py-2 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
            to="/login"
          >
            LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
}
