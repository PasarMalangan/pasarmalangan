import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPembeli from "../../components/containers/sidebar/sidebarPembeli";
export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="flex flex-col lg:flex-row h-screen">
        <SidebarPembeli />
        {/* Bagian konten yang bisa di-scroll */}
        <article className="w-full lg:w-[80%] pt-5 pb-10 shadow-sm overflow-y-auto my-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Wishlist Saya</h5>
            <h6 className="text-lg lg:text-xl py-2">
              Kelola produk yang Anda inginkan di UMKM Pasar Malangan
            </h6>
          </div>
          <section className="flex flex-col px-5 my-10 gap-5">
            {/* product cards */}
            {[1, 2, 3].map((_, index) => (
              <article
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 shadow-lg px-5 py-4"
              >
                <div className="flex gap-5 items-center">
                  <img
                    className="w-28"
                    src="https://i.pinimg.com/736x/db/0c/0e/db0c0e6ef196823b5f11922fcf70bb01.jpg"
                    alt="product"
                  />
                  <div className="flex flex-col justify-between gap-2">
                    <Link className="flex items-center gap-2 text-blue-600 font-semibold text-base lg:text-lg hover:text-blue-700">
                      <ion-icon name="bag"></ion-icon>
                      <p>Toko Sifu Hansen</p>
                    </Link>
                    <Link className="text-base lg:text-lg font-semibold hover:text-slate-800">
                      Bakso Tanpa Tepung
                    </Link>
                    <div className="w-max bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-5 py-1 rounded-lg cursor-pointer text-sm lg:text-base">
                      Kuliner
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-end gap-4">
                  <p className="text-green-500 font-bold text-lg lg:text-xl">
                    Rp. 90.000
                  </p>
                  <button className="text-red-500 font-bold text-lg lg:text-xl">
                    Hapus
                  </button>
                  <ion-icon size="large" name="bookmark"></ion-icon>
                </div>
              </article>
            ))}
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}