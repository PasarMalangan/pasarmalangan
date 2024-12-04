import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import image from "../../image";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/containers/sidebar/sidebar";
export default function Wishlist() {
  const [gender, setGender] = useState("laki-laki");
  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <Sidebar />
        {/* Bagian konten yang bisa di-scroll */}
        <article className="w-[80%] pt-5 pb-10 shadow-sm overflow-y-auto my-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Wishlist Saya</h5>
            <h6 className="text-xl py-2">
              Kelola produk yang Anda inginkan di UMKM Pasar Malangan
            </h6>
          </div>
          <section className="flex flex-col px-5 my-10 gap-5">
            {/* product cards */}
            <article className="grid grid-cols-2 border-2 shadow-lg px-5 py-2">
              <div className="flex gap-5">
                <img
                  className="w-28"
                  src="https://i.pinimg.com/736x/db/0c/0e/db0c0e6ef196823b5f11922fcf70bb01.jpg"
                  alt="product"
                />
                <div className="flex flex-col justify-between gap-5">
                  <Link className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700">
                    <ion-icon name="bag"></ion-icon>
                    <p>Toko Sifu Hansen</p>
                  </Link>
                  <Link className="text-lg font-semibold hover:text-slate-800">
                    Bakso Tanpa Tepung
                  </Link>
                  <div className="w-max bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-1 rounded-lg cursor-pointer">
                    Kuliner
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-500 font-bold text-xl">Rp. 90.000</p>
                <button className="text-red-500 font-bold text-xl">
                  Hapus
                </button>
                <ion-icon size="large" name="bookmark"></ion-icon>
              </div>
            </article>
            <article className="grid grid-cols-2 border-2 shadow-lg px-5 py-2">
              <div className="flex gap-5">
                <img
                  className="w-28"
                  src="https://i.pinimg.com/736x/db/0c/0e/db0c0e6ef196823b5f11922fcf70bb01.jpg"
                  alt="product"
                />
                <div className="flex flex-col justify-between gap-5">
                  <Link className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700">
                    <ion-icon name="bag"></ion-icon>
                    <p>Toko Sifu Hansen</p>
                  </Link>
                  <Link className="text-lg font-semibold hover:text-slate-800">
                    Bakso Tanpa Tepung
                  </Link>
                  <div className="w-max bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-1 rounded-lg cursor-pointer">
                    Kuliner
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-500 font-bold text-xl">Rp. 90.000</p>
                <button className="text-red-500 font-bold text-xl">
                  Hapus
                </button>
                <ion-icon size="large" name="bookmark"></ion-icon>
              </div>
            </article>
            <article className="grid grid-cols-2 border-2 shadow-lg px-5 py-2">
              <div className="flex gap-5">
                <img
                  className="w-28"
                  src="https://i.pinimg.com/736x/db/0c/0e/db0c0e6ef196823b5f11922fcf70bb01.jpg"
                  alt="product"
                />
                <div className="flex flex-col justify-between gap-5">
                  <Link className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700">
                    <ion-icon name="bag"></ion-icon>
                    <p>Toko Sifu Hansen</p>
                  </Link>
                  <Link className="text-lg font-semibold hover:text-slate-800">
                    Bakso Tanpa Tepung
                  </Link>
                  <div className="w-max bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-1 rounded-lg cursor-pointer">
                    Kuliner
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-500 font-bold text-xl">Rp. 90.000</p>
                <button className="text-red-500 font-bold text-xl">
                  Hapus
                </button>
                <ion-icon size="large" name="bookmark"></ion-icon>
              </div>
            </article>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
