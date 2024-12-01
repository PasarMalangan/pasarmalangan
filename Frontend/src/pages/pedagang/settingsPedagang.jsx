import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";

export default function SettingsPedagang() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch data user dari API menggunakan token
    fetch("http://localhost:5000/api/user/getuser", {
      headers: {
        Authorization: `Bearer ${token}`, // Kirim token sebagai Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); // Simpan data user ke dalam state
        setLoading(false); // Hentikan loading
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [token]); // Dependency pada token

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userData) {
    return <div>Data pengguna tidak ditemukan.</div>; // Error state jika userData null setelah loading selesai
  }

  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <SidebarPedagang />
        <article className="w-[80%] pt-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Akun UMKM Anda</h5>
            <h6 className="text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi, dan
              mengamankan akun
            </h6>
          </div>
          <form className="grid grid-cols-2" action="" method="post">
            <section className="flex flex-col px-5 my-10 gap-5">
              <input
                type="text"
                name="namausaha"
                id="namausaha"
                placeholder="Nama Usaha"
              />
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Deskripsi Usaha...."
              />
              <div>
                <label htmlFor="">Nama Pemilik</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Nama Pemilik</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Nama Pemilik</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Nama Pemilik</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Nama Pemilik</label>
                <input type="text" name="" id="" />
              </div>
            </section>
            <section>
              <img
                className="rounded-full w-60 h-60"
                src={userData.profilepict}
                alt=""
              />
            </section>
          </form>
        </article>
      </main>
      <Footer />
    </>
  );
}
