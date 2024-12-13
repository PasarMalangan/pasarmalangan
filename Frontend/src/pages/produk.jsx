import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TokopediaLogo from "../../public/marketplace/logo/tokopedia.svg";
import ShopeeLogo from "../../public/marketplace/logo/Shopee.svg";
import LoaderPage from "../components/elements/loading";

const apiroutes = import.meta.env.VITE_API_BASE_URL;

const getEcommerceLogo = (link) => {
  if (link.includes("tokopedia")) {
    return (
      <img
        src={TokopediaLogo}
        alt="Tokopedia"
        className="h-10 w-30 object-contain"
      />
    );
  }
  if (link.includes("shopee")) {
    return (
      <img src={ShopeeLogo} alt="Shopee" className="h-10 w-30 object-contain" />
    );
  } else {
    return (
      <span className="inline-block p-2 bg-blue-500 text-white px-6 rounded-lg">
        Marketplace
      </span>
    );
  }
};


const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-center text-gray-800 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default function ProductDetail() {
  const [clicked, setClicked] = useState(false);
  const [productData, setProductData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiroutes}/products/detailproduct/${id}`
        );
        if (!response.ok) {
          throw new Error("Gagal memuat produk");
        }
        const data = await response.json();
        setProductData(data);
        // Ambil produk terkait berdasarkan kategori produk yang sedang dilihat
        const relatedResponse = await fetch(
          `${apiroutes}/products/related?category=${data.category}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!relatedResponse.ok) {
          throw new Error("Gagal memuat produk terkait");
        }
        const relatedData = await relatedResponse.json();
        const approvedRelatedProducts = relatedData.filter(
          (product) => product.isApproved === "disetujui"
        );
        setRelatedProducts(approvedRelatedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <LoaderPage />;
  }

  if (!productData) {
    return <p>Produk tidak ditemukan.</p>;
  }

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setNotification("Anda harus login sebagai pembeli untuk menambahkan produk ke wishlist.");
      return;
    }

    try {
      const response = await fetch(`${apiroutes}/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (response.ok) {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      } else {
        const errorData = await response.json();
        setNotification(errorData.message || "Gagal menambahkan produk ke wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setNotification("Terjadi kesalahan saat menambahkan produk ke wishlist.");
    }
  };
  

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
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <main className="p-10 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
          <div className="flex flex-col md:flex-row items-start">
            {/* Gambar Produk */}
            <div className="w-full md:w-1/2">
              {productData.images && productData.images.length > 1 ? (
                <Slider {...settings}>
                  {productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  src={productData.images ? productData.images[0] : ""}
                  alt={productData.name}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
            {/* Detail Produk */}
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="capitalize text-2xl md:text-3xl font-bold mb-4">
                {productData.name}
              </h1>
              {clicked && (
                <p className="mt-2 text-green-700 font-semibold text-sm">
                  Produk telah ditambahkan ke wishlist Anda!
                </p>
              )}
              <p className="text-lg font-semibold text-gray-600 mb-2">
                Rp {(productData.harga ?? 0).toLocaleString()}
              </p>

              <p className="capitalize text-sm text-gray-500 mb-4">
                Dijual oleh:{" "}
                <span className="font-medium">{productData.namausaha}</span>
              </p>
              <p className="text-sm text-black mb-4">
                Kategori:{" "}
                <span className="font-medium capitalize">
                  {productData.category}
                </span>
              </p>
              <p className="text-gray-700 mb-6">{productData.description}</p>
              <div className="space-y-3">
                <button
                  onClick={handleAddToWishlist}
                  className={`w-full md:w-auto text-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-2 ${
                    clicked ? "bg-green-500" : ""
                  }`}
                >
                  {clicked ? "Tunggu Sebentar" : "Tambahkan ke Wishlist"}
                </button>

                <Link
                  to={`/tokodetail/${productData.owner_id}`}
                  className="w-full md:w-auto text-center inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-2"
                >
                  Profil Toko
                </Link>
              </div>
              <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h5 className="text-lg font-bold mb-4">Link Marketplace</h5>
                <div className="flex flex-wrap space-y-3 gap-3">
                  {productData.linkecommerences?.map((link, index) => (
                    <Link
                      key={index}
                      to={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow hover:scale-105 hover:shadow-lg transition-transform duration-100 w-fit"
                    >
                      {getEcommerceLogo(link)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produk Terkait */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <section
            id="related-products"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                to={`/detailproduk/${relatedProduct._id}`}
                rel="noopener noreferrer"
                onClick={() => handleProductClick(relatedProduct._id)}
                className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
              >
                <div className="w-full relative">
                  <img
                    className="w-full h-36 sm:h-40 object-cover"
                    src={relatedProduct.images[0]}
                    alt={`Gambar ${relatedProduct.name}`}
                    loading="lazy"
                  />
                  <p
                    className={`md:hidden text-center capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                      categoryStyles[relatedProduct.category]
                    }`}
                  >
                    {relatedProduct.category}
                  </p>
                </div>

                <div className="p-4">
                  <h5 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {relatedProduct.name}
                  </h5>

                  <div className="flex items-center justify-between my-3">
                    <p className="text-gray-700 font-bold">{`Rp. ${relatedProduct.harga}`}</p>
                    <span
                      className={`hidden md:block capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                        categoryStyles[relatedProduct.category]
                      }`}
                    >
                      {relatedProduct.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
