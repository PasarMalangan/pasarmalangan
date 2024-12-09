import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPembeli from "../../components/containers/sidebar/sidebarPembeli";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPembeli() {
  const [userData, setUserData] = useState(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch data user dari API menggunakan token
    fetch(`${apiroutes}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setGender(data.jeniskelamin);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userData) {
    return <div>Data pengguna tidak ditemukan.</div>;
  }
  const formattedDate = new Date(userData.tanggallahir)
    .toISOString()
    .split("T")[0];

  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <SidebarPembeli />
        <article className="w-[80%] pt-5 pb-10 border-2 shadow-sm my-5">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Profil Saya</h5>
            <h6 className="text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi, dan
              mengamankan akun
            </h6>
          </div>
          <section className="flex flex-col px-5 my-10 gap-5">
            <div className="flex items-center">
              <label className="w-1/4 text-xl" htmlFor="name">
                Nama
              </label>
              <input
                className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                type="text"
                value={userData.name || ""}
                name="name"
                id="name"
                readOnly
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-xl" htmlFor="username">
                Username
              </label>
              <input
                className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                type="text"
                value={userData.username || ""}
                name="username"
                id="username"
                readOnly
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-xl" htmlFor="email">
                Email
              </label>
              <input
                className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                type="email"
                value={userData.email || ""}
                name="email"
                id="email"
                readOnly
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-xl" htmlFor="notelepon">
                No Telepon
              </label>
              <input
                className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                type="tel"
                value={userData.notelepon || ""}
                name="notelepon"
                id="notelepon"
                readOnly
              />
            </div>
            <div className="flex items-center">
              <h6 className="w-1/4 text-xl">Jenis Kelamin</h6>
              <div className="flex items-center gap-3 mr-10">
                <input
                  type="radio"
                  value="laki-laki"
                  name="jeniskelamin"
                  checked={gender === "laki-laki"}
                  readOnly
                />
                <label className="text-xl" htmlFor="laki-laki">
                  Laki-laki
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value="perempuan"
                  name="jeniskelamin"
                  checked={gender === "perempuan"}
                  readOnly
                />
                <label className="text-xl" htmlFor="perempuan">
                  Perempuan
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-xl" htmlFor="tanggallahir">
                Tanggal Lahir
              </label>
              <input
                className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                type="date"
                value={
                  userData.tanggallahir
                    ? new Date(userData.tanggallahir)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                name="tanggallahir"
                placeholder="Tanggal Lahir"
                id="tanggallahir"
                readOnly
              />
            </div>
            <Link
              to="/pengaturan/pembeli"
              className="rounded-md mt-5 w-1/3 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out"
            >
              Ubah Pengaturan Akun
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
