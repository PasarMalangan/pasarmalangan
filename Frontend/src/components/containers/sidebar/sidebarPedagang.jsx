import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function SidebarPedagang() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");

  useAuthCheck();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserData(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      setLoading(true);
      try {
        jwtDecode(token);

        const response = await fetch(`${apiroutes}/user/getuser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna.");
        }

        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat mengambil data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Navbar (Mobile) */}
      <div className="sticky top-0 left-0 w-full bg-blue-500 shadow-md z-50 md:hidden flex items-center justify-between px-4 py-3">
        <button
          className="text-white"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          <ion-icon
            name={isSidebarOpen ? "close" : "menu"}
            size="large"
          ></ion-icon>
        </button>
        {userData && userData.profilepict && (
          <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <img
              className="rounded-full w-14"
              src={userData.profilepict}
              alt="Profile"
            />
          </button>
        )}

        {/* Dropdown jika gambar diklik */}
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
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-[20%]`}
      >
        <ul className="flex flex-col gap-10 p-5 translate-y-20 md:translate-y-0">
          <li className="flex items-center gap-5">
            {isLoading ? (
              <>
                <ion-icon
                  size="large"
                  name="refresh-outline"
                  className="animate-spin"
                ></ion-icon>
                <p>Memuat data akun...</p>
              </>
            ) : userData ? (
              <>
                <img
                  className="w-16 h-16 rounded-full"
                  src={userData.profilepict}
                  alt="imgprofile"
                />
                <h6 className="text-xl font-medium">{userData.namausaha}</h6>
              </>
            ) : (
              <p>{error || "Data pengguna tidak tersedia."}</p>
            )}
          </li>
          <li>
            <div className="flex items-center text-xl gap-5 font-medium text-gray-600">
              <ion-icon size="large" name="construct-outline"></ion-icon>
              <h6>Admin Tools</h6>
            </div>
            <div className="flex flex-col gap-2 pl-[50px] font-medium text-lg">
              <Link
                className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                  isActive("/dashboard/pedagang")
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
                to={"/dashboard/pedagang"}
              >
                Dashboard
              </Link>
              <Link
                className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                  isActive("/products") ? "text-blue-600 font-medium" : ""
                }`}
                to={"/products/pedagang"}
              >
                Products
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center text-xl gap-5 font-medium text-gray-600">
              <ion-icon size="large" name="settings-outline"></ion-icon>
              <h6>Akun</h6>
            </div>
            <div className="flex flex-col gap-2 pl-[50px] font-medium text-lg">
              <Link
                className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                  isActive("/pengaturan/pedagang")
                    ? "text-blue-600 font-medium"
                    : ""
                }`}
                to={"/pengaturan/pedagang"}
              >
                Pengaturan Akun
              </Link>
              <Link
                className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                  isActive("/helpsupport") ? "text-blue-600 font-medium" : ""
                }`}
                to={"/helpsupport"}
              >
                Bantuan
              </Link>
              <button className="text-red-600 w-max" onClick={handleLogout}>
                <p>Log Out</p>
              </button>
            </div>
          </li>
        </ul>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}