import { useState, useEffect } from "react";
import Navbar from "../../components/containers/navbar/navbar";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import Footer from "../../components/containers/footer/footer";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Untuk kontrol modal
  const [productToDelete, setProductToDelete] = useState(null); // ID produk yang akan dihapus

  // Ambil token dari localStorage atau context (sesuaikan dengan implementasi Anda)
  const token = localStorage.getItem("token");

  // Ambil data produk saat komponen dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/getproducts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  // Untuk menghapus produk
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus produk");
      }

      setProducts(products.filter((product) => product._id !== id)); // Hapus dari state
      setShowModal(false); // Tutup modal setelah penghapusan berhasil
    } catch (err) {
      console.error(err);
    }
  };

  // Tampilkan modal konfirmasi
  const handleOpenModal = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  // Tutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <SidebarPedagang />

        <article className="w-[80%] pt-5 px-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <section className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard Produk Pedagang
            </h1>
            <Link
              to={"/products/create"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Tambah Produk
            </Link>
          </section>

          {loading ? (
            <p className="text-center text-gray-600">Memuat produk...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <section>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Gambar
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Nama Produk
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Harga
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Kategori
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Status Disetujui
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id} className="border-t">
                        <td className="px-6 py-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">{`Rp. ${product.harga}`}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              product.isApproved === "disetujui"
                                ? "bg-green-500"
                                : product.isApproved === "ditolak"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            } text-white px-3 py-1 rounded-full`}
                          >
                            {product.isApproved}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-3">
                          <Link
                            to={`/products/edit/${product._id}`}
                            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleOpenModal(product._id)} // Membuka modal
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-500"
                      >
                        Tidak ada produk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          )}
        </article>
      </main>

      {/* Modal konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Konfirmasi Penghapusan
            </h3>
            <p>Apakah Anda yakin ingin menghapus produk ini?</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteProduct(productToDelete)} // Hapus produk
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
