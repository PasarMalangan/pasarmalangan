import { Link, useNavigate } from "react-router-dom";
import image from "../../../image";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";

export default function Navbar() {
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
    fetch("http://localhost:5000/api/user/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) =>
        console.error(error)
      );
  }, [token]);

  return (
    <header className="w-full bg-blue-500 px-10 py-2 sticky top-0 left-0 z-50">
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
