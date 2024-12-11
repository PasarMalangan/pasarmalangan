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
      if (!token) {
        setError("Token tidak ditemukan, silakan login.");
        return;
      }

      setLoading(true);

      try {
        // Mendekode token untuk mendapatkan userId dan role
        jwtDecode(token);

        // Mengambil data lengkap user dari backend
        const response = await fetch(`${apiroutes}/user/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const isActive = (path) => location.pathname === path;
  return (
    // <aside className="w-[20%] h-full bg-gray-200 p-5 border-r-2 shadow-inner shadow-gray-300">
    //   <ul className="flex flex-col gap-10">
    //     <li className="flex items-center gap-5">
    //       {isLoading ? (
    //         <>
    //           <ion-icon
    //             size="large"
    //             name="refresh-outline"
    //             className="animate-spin"
    //           ></ion-icon>
    //           <p>Memuat data akun...</p>
    //         </>
    //       ) : userData ? (
    //         <>
    //           <img
    //             className="w-16 h-16 rounded-full"
    //             src={userData.profilepict}
    //             alt="imgprofile"
    //           />
    //           <h6 className="text-xl font-medium">{userData.username}</h6>
    //         </>
    //       ) : (
    //         <p>{error || "Data tidak ditemukan."}</p>
    //       )}
    //     </li>
    //     <Link to="/dashboard/pembeli">
    //       <li
    //         className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
    //           isActive("/dashboard/pembeli") ? "text-blue-600 font-medium" : ""
    //         }`}
    //       >
    //         <ion-icon size="large" name="person-outline"></ion-icon>
    //         <p>Akun</p>
    //       </li>
    //     </Link>
    //     <Link to="/wishlist/pembeli">
    //       <li
    //         className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
    //           isActive("/wishlist/pembeli") ? "text-blue-600 font-medium" : ""
    //         }`}
    //       >
    //         <ion-icon size="large" name="bookmark-outline"></ion-icon>
    //         <p>Wishlist</p>
    //       </li>
    //     </Link>
    //     <Link to="/pengaturan/pembeli">
    //       <li
    //         className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
    //           isActive("/pengaturan/pembeli") ? "text-blue-600 font-medium" : ""
    //         }`}
    //       >
    //         <ion-icon size="large" name="settings-outline"></ion-icon>
    //         <p>Pengaturan Akun</p>
    //       </li>
    //     </Link>
    //     <Link to="/helpsupport">
    //       <li
    //         className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
    //           isActive("/helpsupport") ? "text-blue-600 font-medium" : ""
    //         }`}
    //       >
    //         <ion-icon size="large" name="help-circle-outline"></ion-icon>
    //         <p>Bantuan</p>
    //       </li>
    //     </Link>
    //     <button onClick={handleLogout}>
    //       <li className="flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out text-red-600">
    //         <ion-icon size="large" name="log-out-outline"></ion-icon>
    //         <p>Log Out</p>
    //       </li>
    //     </button>
    //   </ul>
    // </aside>
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
                    isActive("/dashboard/pembeli") ? "font-medium" : ""
                  }`}
                  to="/dashboard/pembeli"
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
                    isActive("/pengaturan/pembeli") ? "font-medium" : ""
                  }`}
                  to="/pengaturan/pembeli"
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
                <h6 className="text-xl font-medium">{userData.username}</h6>
              </>
            ) : (
              <p>{error || "Data pengguna tidak tersedia."}</p>
            )}
          </li>
          <Link to="/dashboard/pembeli">
            <li
              className={`flex items-center text-xl gap-5 hover:text-blue-700 transition-colors duration-300 ease-out ${
                isActive("/dashboard/pembeli")
                  ? "text-blue-600 font-medium"
                  : ""
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
                isActive("/pengaturan/pembeli")
                  ? "text-blue-600 font-medium"
                  : ""
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
