import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
import { useState, useEffect } from "react";
import LoaderPage from "../components/elements/loading";

const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function ShopDetail() {
  const { id } = useParams();
  const [shopOwner, setShopOwner] = useState(null);
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch data toko berdasarkan owner_id
        const shopResponse = await fetch(`${apiroutes}/user/toko/${id}`);
        if (!shopResponse.ok) {
          throw new Error("Gagal memuat data toko.");
        }
        const shopData = await shopResponse.json();
        setShopOwner(shopData);

        // Fetch produk milik toko
        const productsResponse = await fetch(
          `${apiroutes}/products/getproductfrom?owner_id=${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!productsResponse.ok) {
          throw new Error("Gagal memuat data produk.");
        }
        const productsData = await productsResponse.json();
        const approvedProducts = productsData.filter(
          (product) => product.isApproved === "disetujui"
        );
        setShopProducts(approvedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [id]);

  if (loading) {
    return <LoaderPage />;
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-semibold mt-10">{error}</p>
    );
  }

  if (!shopOwner) {
    return (
      <p className="text-center text-red-600 font-semibold mt-10">
        Toko tidak ditemukan.
      </p>
    );
  }
  const categoryStyles = {
    kuliner: "bg-red-500",
    fashion: "bg-blue-700",
    pertanian: "bg-green-500",
    kerajinan: "bg-yellow-500",
    digital: "bg-cyan-500",
  };

  return (
    <>
      <Navbar />
      <main className="p-10 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-start">
            {/* Gambar toko */}
            <div className="w-full md:w-1/2">
              <img
                src={
                  shopOwner.profilepict
                    ? shopOwner.profilepict
                    : "https://via.placeholder.com/150?text=No+Image"
                }
                alt={shopOwner.namausaha}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Detail toko */}
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="capitalize text-3xl font-bold mb-2 text-blue-700">
                {shopOwner.namausaha}
              </h1>
              <p
                className="text-gray-600 mb-4"
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <span className="font-semibold">Deskripsi Usaha:</span>{" "}
                <span className="font-normal">
                  {shopOwner.description
                    ? shopOwner.description
                    : "Belum ada deskripsi"}
                </span>
              </p>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Informasi Usaha:
                </h2>
                <p className="text-gray-600">Alamat: {shopOwner.alamatusaha}</p>
                <p className="capitalize text-gray-600">
                  Kategori: {shopOwner.category || "Tidak tersedia"}
                </p>
                <p className="text-gray-600">Kontak: {shopOwner.notelepon}</p>
              </div>
              <Link
                to={`https://wa.me/${shopOwner.notelepon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Hubungi Penjual
              </Link>
            </div>
          </div>
        </div>
        <br />
        <h4 className="px-5 text-2xl font-bold text-center">
          Produk Dari Toko
        </h4>
        <br />
        <section id="unggulan">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {shopProducts.map((product) => (
              <Link
                key={product._id}
                to={`/detailproduk/${product._id}`}
                rel="noopener noreferrer"
                onClick={() => handleProductClick(product._id)}
                className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
              >
                <div className="w-full relative">
                  <img
                    className="w-full h-36 sm:h-40 object-cover"
                    src={product.images[0]}
                    alt={`Gambar ${product.name}`}
                    loading="lazy"
                  />
                  <p
                    className={`md:hidden text-center capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                      categoryStyles[product.category]
                    }`}
                  >
                    {product.category}
                  </p>
                </div>

                <div className="p-4">
                  <h5 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h5>

                  <div className="flex items-center justify-between my-3">
                    <p className="text-gray-700 font-bold">{`Rp. ${product.harga}`}</p>
                    <span
                      className={`hidden md:block capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                        categoryStyles[product.category]
                      }`}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
