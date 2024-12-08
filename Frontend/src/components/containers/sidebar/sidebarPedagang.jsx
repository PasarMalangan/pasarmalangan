import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../../../hooks/useAuthCheck";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function SidebarPedagang() {
  const location = useLocation();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
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
        return;
      }

      setLoading(true);
      try {
        // Mendekode token
        const decodedToken = jwtDecode(token);
        console.log("UserId:", decodedToken.userId);

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

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-[20%] h-full bg-slate-50 p-5 border-r-2 shadow-inner shadow-slate-100">
      <ul className="flex flex-col gap-10">
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

        {/* <li>
          <div className="flex items-center text-xl gap-5 font-medium text-gray-600">
            <ion-icon size="large" name="school-outline"></ion-icon>
            <h6>Pembelajaran</h6>
          </div>
          <div className="flex flex-col gap-2 pl-[50px] font-medium text-lg">
            <Link
              className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                isActive("/artikelpanduan") ? "text-blue-600 font-medium" : ""
              }`}
              to={"/artikelpanduan"}
            >
              Artikel Panduan
            </Link>
            <Link
              className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                isActive("/videopanduan") ? "text-blue-600 font-medium" : ""
              }`}
              to={"/videopanduan"}
            >
              Video Panduan
            </Link>
            <Link
              className={`hover:text-blue-700 transition-colors duration-300 ease-out ${
                isActive("/forum") ? "text-blue-600 font-medium" : ""
              }`}
              to={"/forum"}
            >
              Forum Diskusi
            </Link>
          </div>
        </li> */}

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
  );
}
