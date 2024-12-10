import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../../../image";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
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

  function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      line1.classList.add("rotate-45", "translate-y-2.5");
      line2.classList.add("opacity-0");
      line3.classList.add("-rotate-45", "-translate-y-2.5");
    } else {
      menu.classList.add("hidden");
      line1.classList.remove("rotate-45", "translate-y-2.5");
      line2.classList.remove("opacity-0");
      line3.classList.remove("-rotate-45", "-translate-y-2.5");
    }
  }
  const isActive = (path) => location.pathname === path;
  return (
    <header className="w-full bg-blue-500 px-5 md:px-10 h-full py-2 sticky top-0 left-0 z-50">
      <nav className="flex items-center justify-between">
        {/* Hamburger Menu for Mobile */}
        <button
          id="menu-toggle"
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="space-y-2">
            <span
              id="line1"
              className="block h-1 w-8 bg-white transition-transform duration-300"
            ></span>
            <span
              id="line2"
              className="block h-1 w-8 bg-white transition-opacity duration-300"
            ></span>
            <span
              id="line3"
              className="block h-1 w-8 bg-white transition-transform duration-300"
            ></span>
          </div>
        </button>

        {/* Logo for Larger Screens */}
        <Link to="/" className="hidden md:block">
          <img src={image.logo_header} alt="iconhome" />
        </Link>

        <ul className="hidden md:flex gap-10 text-white">
          <li>
            <Link
              className={`text-xl hover:text-yellow-300 transition-colors duration-300 ease-out ${
                isActive("/") ? "text-yellow-500" : ""
              }`}
              to="/"
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              className={`text-xl hover:text-yellow-300 transition-colors duration-300 ease-out ${
                isActive("/marketplace") ? "text-yellow-500" : ""
              }`}
              to="/marketplace"
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link
              className={`text-xl hover:text-yellow-300 transition-colors duration-300 ease-out ${
                isActive("/service") ? "text-yellow-500" : ""
              }`}
              to="/service"
            >
              Layanan
            </Link>
          </li>
          <li>
            <Link
              className={`text-xl hover:text-yellow-300 transition-colors duration-300 ease-out ${
                isActive("/aboutus") ? "text-yellow-500" : ""
              }`}
              to="/aboutus"
            >
              Tentang Kami
            </Link>
          </li>
        </ul>

        {/* Login/Logout Button */}

        {isLoggedIn ? (
  userData && userData.profilepict ? (
    <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
      <img
        className="rounded-full w-14"
        src={userData.profilepict}
        alt="Profile"
      />
    </button>
  ) : null
) : (
  <Link
    className="text-lg md:text-xl rounded-2xl border-[1.5px] shadow-2xl px-5 md:px-10 py-2 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
    to="/login"
  >
    LOGIN
  </Link>
)}

      </nav>
      {isDropdownOpen && userData && (
          <div
            className={`absolute bg-white shadow-lg p-4 rounded-lg mt-2 w-48 right-0 top-full transition-all duration-300 ease-out transform ${
              isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <ul>
              <li>
                <Link
                  className={`block text-gray-700 py-2 ${
                    isActive("/dashboard/pedagang") ? "font-medium" : ""
                  }`}
                  to="/dashboard/pedagang"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={`block text-gray-700 py-2 ${
                    isActive("/marketplace") ? "font-medium" : ""
                  }`}
                  to="/marketplace"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  className={`block text-gray-700 py-2 ${
                    isActive("/pengaturan/pedagang") ? "font-medium" : ""
                  }`}
                  to="/pengaturan/pedagang"
                >
                  Pengaturan
                </Link>
              </li>
              <li>
                <button
                  className="block text-red-600 py-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden flex-col gap-2 my-2 bg-blue-600 text-white p-5 rounded-lg md:hidden"
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              className="text-lg hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/"
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              className="text-lg hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/marketplace"
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link
              className="text-lg hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/service"
            >
              Layanan
            </Link>
          </li>
          <li>
            <Link
              className="text-lg hover:text-yellow-300 transition-colors duration-300 ease-out"
              to="/aboutus"
            >
              Tentang Kami
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
