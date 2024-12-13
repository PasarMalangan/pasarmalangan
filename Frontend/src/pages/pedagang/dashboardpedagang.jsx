import { useState, useEffect } from "react";
import Footer from "../../components/containers/footer/footer";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import Navbar from "../../components/containers/navbar/navbar";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPedagang() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiroutes}/products/getproducts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Produk tidak ditemukan, silahkan tambah produk UMKM Anda"
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(`${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const stats = products.reduce(
    (acc, product) => {
      acc.totalClicks += product.click;
      if (product.isApproved === "pending") {
        acc.pendingCount += 1;
      }
      return acc;
    },
    { totalClicks: 0, pendingCount: 0 }
  );

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
            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Jumlah Produk
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {products.length}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Klik Produk
              </h2>
              <p className="text-3xl font-bold text-blue-600">{stats.totalClicks}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Produk Pending
              </h2>
              <p className="text-3xl font-bold text-blue-600">{stats.pendingCount}</p>
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
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-600 py-4">
                      Memuat produk...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="3" className="text-center text-red-500 py-4">
                      {error}
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">{product.click}</td>
                      <td
                        className={`py-2 px-4 font-semibold capitalize ${
                          product.isApproved === "disetujui"
                            ? "text-green-500"
                            : product.isApproved === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.isApproved}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-600 py-4">
                      Tidak ada produk tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
