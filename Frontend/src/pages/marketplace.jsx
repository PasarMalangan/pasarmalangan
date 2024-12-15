import { useState, useEffect } from "react";
import image from "../image";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
import SearchResults from "../components/containers/marketplace/SearchResults";
import { Link } from "react-router-dom";
import AdsSlider from "../components/containers/adsslider/AdsSlider";
import LoaderPage from "../components/elements/loading";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterLocation, setIsFilterLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState({
    allProducts: [],
    recommendedProducts: [],
    highlightedStores: [],
  });
  const [hoveredProducts, setHoveredProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiroutes}/products/getallproducts`);

        if (!response.ok) {
          throw new Error("Gagal memuat produk");
        }

        const data = await response.json();

        // Filter hanya produk dengan status disetujui
        const approvedProducts = data.filter(
          (product) => product.isApproved === "disetujui"
        );

        // Rekomendasi: Urutkan berdasarkan jumlah klik menurun
        const recommendedProducts = [...approvedProducts].sort(
          (a, b) => b.click - a.click
        );

        // Dari Toko Unggulan: Kelompokkan produk per toko dan hitung akumulasi klik
        const storeClicks = {};
        approvedProducts.forEach((product) => {
          if (!storeClicks[product.namausaha]) {
            storeClicks[product.namausaha] = 0;
          }
          storeClicks[product.namausaha] += product.click;
        });
        const highlightedStores = Object.entries(storeClicks)
          .sort(([, clicksA], [, clicksB]) => clicksB - clicksA)
          .map(([storeName]) =>
            approvedProducts.filter(
              (product) => product.namausaha === storeName
            )
          )
          .flat();

        setProductList({
          allProducts: approvedProducts,
          recommendedProducts,
          highlightedStores,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProductClick = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiroutes}/products/${productId}/click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error recording product click:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleLocationClick = () => {
    // Toggle filter visibility
    setIsFilterLocation((prevState) => !prevState);

    // Optionally, hide search after a delay when the filter is shown
    if (!filterLocation) {
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };

  const categoryStyles = {
    kuliner: "bg-red-500",
    fashion: "bg-blue-700",
    pertanian: "bg-green-500",
    kerajinan: "bg-yellow-500",
    digital: "bg-cyan-500",
  };

  const handleHover = (id, isHovered) => {
    setHoveredProducts((prev) => ({ ...prev, [id]: isHovered }));
  };

  if (loading) {
    <LoaderPage />;
  }

  return (
    <>
      <Navbar />
      <main className="w-full h-max bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 py-10 px-5">
        <div className="relative max-w-full px-4 sm:px-6 lg:px-8 mx-auto w-full pb-10">
          {/* Tombol Filter Lokasi untuk Mobile */}
          <button
            onClick={() => handleLocationClick("")}
            className="sm:hidden flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-sm px-3 py-2 mb-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition duration-100"
          >
            <img
              className="w-5 h-5 mr-2"
              src={image.icon_location}
              alt="Location Icon"
            />
            <span className="text-gray-700 font-medium text-sm">
              Filter Lokasi
            </span>
          </button>

          {/* Form Pencarian */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-wrap items-center w-[80vw] bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-transform duration-300 ease-in-out focus-within:scale-105 focus-within:shadow-xl focus-within:border-blue-600 hover:shadow-blue-300 hover:border-blue-400 mx-auto"
          >
            <button
              className="hidden sm:flex items-center bg-white border border-gray-300 rounded-full shadow-sm mx-2 sm:mx-4 px-4 py-2 cursor-pointer hover:border-blue-400 hover:shadow-md transition duration-100"
              onClick={() => handleLocationClick("")}
            >
              <img
                className="w-6 h-6 sm:w-7 sm:h-7 mr-2"
                src={image.icon_location}
                alt="Location Icon"
              />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Filter Lokasi
              </span>
            </button>
            <input
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 placeholder:text-gray-400 placeholder:font-semibold text-sm sm:text-lg text-gray-700 focus:outline-none mb-2 sm:mb-0"
              type="text"
              name="query"
              placeholder="Cari Produk UMKM Malang"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-150 ease-in-out"
            >
              <img
                className="w-5 h-5 sm:w-6 sm:h-6"
                src={image.icon_search}
                alt="Search"
              />
            </button>
          </form>
        </div>

        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
          </div>
        )}

        {!isSearching && (searchQuery || filterLocation) && (
          <SearchResults
            searchQuery={searchQuery}
            products={productList.allProducts}
          />
        )}

        {!isSearching && !searchQuery && !filterLocation && (
          <>
            <div>
              <ul className="flex gap-4 sm:gap-10 md:justify-center overflow-x-auto scrollbar-hide px-4">
                <li
                  onClick={() => handleCategoryClick("Kuliner")}
                  className="bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer"
                >
                  Kuliner
                </li>
                <li
                  onClick={() => handleCategoryClick("Fashion")}
                  className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer"
                >
                  Fashion
                </li>
                <li
                  onClick={() => handleCategoryClick("Pertanian")}
                  className="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer"
                >
                  Pertanian
                </li>
                <li
                  onClick={() => handleCategoryClick("Kerajinan")}
                  className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer"
                >
                  Kerajinan
                </li>
                <li
                  onClick={() => handleCategoryClick("Digital")}
                  className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer"
                >
                  Digital
                </li>
              </ul>
            </div>

            <AdsSlider />

            <article id="produk">
              <h4 className="px-5 text-2xl font-bold">Rekomendasi</h4>
              <section id="recomendation" className="my-6 px-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {productList.recommendedProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/detailproduk/${product._id}`}
                      onClick={() => handleProductClick(product._id)}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      {/* Gambar dengan ukuran responsif dan proporsi tetap */}
                      <div className="w-full relative">
                        <img
                          className="w-full h-40 sm:h-48 md:h-60 lg:h-72 object-contain"
                          src={product.images[0]}
                          alt={`Gambar ${product.name}`}
                          loading="lazy"
                        />
                        {/* Kategori hanya tampil di mobile */}
                        <p
                          className={`md:hidden absolute bottom-2 left-2 text-center capitalize text-white text-sm font-medium rounded px-2 py-1 ${
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
                          <p className="text-gray-700 font-bold">
                            Rp {(product.harga ?? 0).toLocaleString()}
                          </p>
                          {/* Kategori untuk layar lebih besar */}
                          <span
                            className={`hidden md:block capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                              categoryStyles[product.category]
                            }`}
                          >
                            {product.category}
                          </span>
                        </div>

                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-0"
                                : "transform translate-y-[100%]"
                            }`}
                          >
                            {product.namausaha}
                          </span>
                        </h6>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <br />

              <h4 className="px-5 text-2xl font-bold">Dari Toko Unggulan</h4>
              <br />

              <section id="unggulan" className="my-6 px-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {productList.highlightedStores.map((product) => (
                    <Link
                      key={product._id}
                      to={`/detailproduk/${product._id}`}
                      onClick={() => handleProductClick(product._id)}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      {/* Gambar dengan ukuran responsif dan proporsi tetap */}
                      <div className="w-full relative">
                        <img
                          className="w-full h-40 sm:h-48 md:h-60 lg:h-72 object-contain"
                          src={product.images[0]}
                          alt={`Gambar ${product.name}`}
                          loading="lazy"
                        />
                        {/* Kategori hanya tampil di mobile */}
                        <p
                          className={`md:hidden absolute bottom-2 left-2 text-center capitalize text-white text-sm font-medium rounded px-2 py-1 ${
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
                          <p className="text-gray-700 font-bold">
                            Rp {(product.harga ?? 0).toLocaleString()}
                          </p>
                          {/* Kategori untuk layar lebih besar */}
                          <span
                            className={`hidden md:block capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                              categoryStyles[product.category]
                            }`}
                          >
                            {product.category}
                          </span>
                        </div>

                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-0"
                                : "transform translate-y-[100%]"
                            }`}
                          >
                            {product.namausaha}
                          </span>
                        </h6>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <br />

              <h4 className="px-5 text-2xl font-bold">Semua Produk</h4>

              <br />

              <section id="allproduct" className="my-6 px-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {productList.allProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/detailproduk/${product._id}`}
                      onClick={() => handleProductClick(product._id)}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      {/* Gambar dengan ukuran responsif dan proporsi tetap */}
                      <div className="w-full relative">
                        <img
                          className="w-full h-40 sm:h-48 md:h-60 lg:h-72 object-contain"
                          src={product.images[0]}
                          alt={`Gambar ${product.name}`}
                          loading="lazy"
                        />
                        {/* Kategori hanya tampil di mobile */}
                        <p
                          className={`md:hidden absolute bottom-2 left-2 text-center capitalize text-white text-sm font-medium rounded px-2 py-1 ${
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
                          <p className="text-gray-700 font-bold">
                            Rp {(product.harga ?? 0).toLocaleString()}
                          </p>
                          {/* Kategori untuk layar lebih besar */}
                          <span
                            className={`hidden md:block capitalize text-white text-sm font-medium rounded px-2 py-1 ${
                              categoryStyles[product.category]
                            }`}
                          >
                            {product.category}
                          </span>
                        </div>

                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capitalize block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-0"
                                : "transform translate-y-[100%]"
                            }`}
                          >
                            {product.namausaha}
                          </span>
                        </h6>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </article>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
