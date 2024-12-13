import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPembeli from "../../components/containers/sidebar/sidebarPembeli";

const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(null); // State untuk tombol loading
  const [notification, setNotification] = useState(null); // State untuk notifikasi

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
    const fetchWishlist = async () => {
      if (!token) {
        setNotification({ type: "error", message: "Token tidak ditemukan." });
        return;
      }

      try {
        const response = await fetch(`${apiroutes}/user/wishlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWishlist(data.wishlist);
        } else {
          throw new Error("Gagal mengambil wishlist");
        }
      } catch (error) {
        setNotification({ type: "error", message: "Gagal memuat wishlist." });
      }
    };

    fetchWishlist();
  }, [token]);

  const handleRemoveFromWishlist = async (productId) => {
    setIsLoading(productId); // Atur loading di tombol tertentu
    try {
      const response = await fetch(`${apiroutes}/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus produk dari wishlist.");
      }

      const data = await response.json();
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      setNotification({ type: "success", message: data.message || "Produk berhasil dihapus." });
    } catch (error) {
      setNotification({ type: "error", message: "Terjadi kesalahan saat menghapus produk." });
    } finally {
      setIsLoading(null); // Hapus loading
    }
  };

  const handleCloseNotification = () => setNotification(null);

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="flex flex-col lg:flex-row h-screen">
        <SidebarPembeli />
        <article className="w-full lg:w-[80%] pt-5 pb-10 shadow-sm overflow-y-auto my-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Wishlist Saya</h5>
            <h6 className="text-lg lg:text-xl py-2">
              Kelola produk yang Anda inginkan di UMKM Pasar Malangan
            </h6>
          </div>
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlist.length === 0 ? (
              <p className="text-center text-lg">Wishlist Anda kosong.</p>
            ) : (
              wishlist.map((product, index) => (
                <article
                  key={index}
                  className="flex flex-col items-center gap-3 border rounded-lg shadow-md p-4 w-full transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-full h-32 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images[0] || "default-image-url"}
                      alt={product.name}
                    />
                  </div>
                  <div className="text-center flex flex-col gap-2">
                    <Link
                      to={`/detailproduk/${product._id}`}
                      className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors truncate"
                    >
                      {product.name}
                    </Link>
                    <Link
                      to={`/tokodetail/${product.owner_id}`}
                      className="text-xs text-gray-600 flex justify-center items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                      <ion-icon name="bag"></ion-icon>
                      <span className="capitalize">{product.namausaha}</span>
                    </Link>
                    <span className="text-xs bg-blue-100 text-blue-600 py-1 px-3 rounded-full capitalize">
                      {product.category}
                    </span>
                    <p className="text-base font-semibold text-green-600">
                      Rp {(product.harga ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between w-full gap-2">
                    <button
                      className={`text-sm text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md w-full transition-colors ${
                        isLoading === product._id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      disabled={isLoading === product._id}
                    >
                      {isLoading === product._id ? "Menghapus..." : "Hapus"}
                    </button>
                    <Link
                      to={`/detailproduk/${product._id}`}
                      className="text-sm text-center text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-md w-full transition-colors"
                    >
                      Detail
                    </Link>
                  </div>
                </article>
              ))
            )}
          </section>
        </article>
      </main>

      {notification && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg border rounded-lg p-4 z-50 w-11/12 sm:w-1/2">
          <p
            className={`text-center ${
              notification.type === "success" ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {notification.message}
          </p>
          <button
            className="mt-3 block mx-auto bg-gray-200 text-gray-700 rounded-md py-1 px-3 hover:bg-gray-300"
            onClick={handleCloseNotification}
          >
            Tutup
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
