import { useState, useEffect } from "react";
import Footer from "../../components/containers/footer/footer";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import Navbar from "../../components/containers/navbar/navbar";

export default function DashboardPedagang() {
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
      <main className="flex flex-col md:flex-row h-screen">
        <SidebarPedagang />

        <article className="w-full md:w-[80%] pt-5 px-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <section className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard Pedagang
            </h1>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: Jumlah Produk */}
            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Jumlah Produk
              </h2>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>

            {/* Card: Total Klik Produk */}
            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Klik Produk
              </h2>
              <p className="text-3xl font-bold text-blue-600">345</p>
            </div>

            {/* Card: Produk Pending */}
            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Produk Pending
              </h2>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Statistik Produk
            </h2>

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Produk</th>
                  <th className="py-2 px-4 text-left">Klik</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 px-4">Produk A</td>
                  <td className="py-2 px-4">120</td>
                  <td className="py-2 px-4 text-green-500 font-semibold">
                    Disetujui
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Produk B</td>
                  <td className="py-2 px-4">90</td>
                  <td className="py-2 px-4 text-yellow-500 font-semibold">
                    Pending
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Produk C</td>
                  <td className="py-2 px-4">45</td>
                  <td className="py-2 px-4 text-red-500 font-semibold">
                    Ditolak
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
