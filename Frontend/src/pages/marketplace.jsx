import { useState, useEffect } from "react";
import image from "../image";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
import SearchResults from "../components/containers/marketplace/SearchResults";
import { Link } from "react-router-dom";

export default function Marketplace() {
  const apiroutes = import.meta.env.VITE_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterLocation, setIsFilterLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
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

        setProductList(approvedProducts); // Hanya set produk yang disetujui
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setIsFilterLocation(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const categoryStyles = {
    kuliner: "bg-red-500 text-white font-medium px-2 py-[2px] rounded-lg",
    fashion: "bg-blue-700 text-white font-medium px-2 py-[2px] rounded-lg",
    pertanian: "bg-green-500 text-white font-medium px-2 py-[2px] rounded-lg",
    kerajinan: "bg-yellow-500 text-white font-medium px-2 py-[2px] rounded-lg",
    digital: "bg-cyan-500 text-white font-medium px-2 py-[2px] rounded-lg",
  };

  const handleHover = (id, isHovered) => {
    setHoveredProducts((prev) => ({ ...prev, [id]: isHovered }));
  };
  return (
    <>
      <Navbar />
      <main className="w-full h-max bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 py-10">
        <div className="relative flex items-center max-w-full px-4 sm:px-6 lg:px-8 mx-auto w-full pb-10">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full sm:w-2/3 lg:w-2/3 bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-transform duration-300 ease-in-out focus-within:scale-105 focus-within:shadow-xl focus-within:border-blue-600 hover:shadow-blue-300 hover:border-blue-400 mx-auto"
          >
            <div
              className="left-4 flex items-center bg-white border border-gray-300 rounded-full shadow-sm mx-4 px-4 py-2 cursor-pointer hover:border-blue-400 hover:shadow-md transition duration-100"
              onClick={() => handleLocationClick("")}
            >
              <img
                className="w-7 h-7 mr-2"
                src={image.icon_location}
                alt="Location Icon"
              />
              <span className="text-gray-700 font-medium">Filter Lokasi</span>
            </div>
            <input
              className="flex-1 px-6 py-3 placeholder:text-gray-400 placeholder:font-semibold text-lg text-gray-700 focus:outline-none"
              type="text"
              name="query"
              placeholder="Cari Produk UMKM Malang"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full m-1 transition-all duration-150 ease-in-out"
            >
              <img className="w-6 h-6" src={image.icon_search} alt="Search" />
            </button>
          </form>
        </div>

        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
          </div>
        )}

        {!isSearching && (searchQuery || filterLocation) && (
          <SearchResults searchQuery={searchQuery} products={productList} />
        )}

        {!isSearching && !searchQuery && !filterLocation && (
          <>
            <div>
              <ul className="flex justify-center gap-10">
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

            <img
              className="mx-auto w-[70vw] py-10"
              src={image.ads_example}
              alt="ads"
            />
            <article id="produk">
              <h4 className="px-5 text-2xl font-bold">Rekomendasi</h4>
              <section id="recomendation" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {productList.map((product) => (
                    <Link
                      key={product._id}
                      to={product.linkecommerences}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      <div className="w-full">
                        <img
                          className="w-full max-h-36 object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg text-gray-900">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between my-5">
                          <p className="text-gray-700 font-bold">{`Rp. ${product.harga}`}</p>
                          <p
                            className={`capitalize ${
                              categoryStyles[product.category]
                            } `}
                          >
                            {product.category}
                          </p>
                        </div>
                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
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
              <section id="unggulan" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {productList.map((product) => (
                    <Link
                      key={product._id}
                      to={product.linkecommerences}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      <div className="w-full">
                        <img
                          className="w-full max-h-36 object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg text-gray-900">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between my-5">
                          <p className="text-gray-700 font-bold">{`Rp. ${product.harga}`}</p>
                          <p
                            className={`capitalize ${
                              categoryStyles[product.category]
                            } `}
                          >
                            {product.category}
                          </p>
                        </div>
                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
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
              <section id="unggulan" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {productList.map((product) => (
                    <Link
                      key={product._id}
                      to={product.linkecommerences}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                    >
                      <div className="w-full">
                        <img
                          className="w-full max-h-36 object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg text-gray-900">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between my-5">
                          <p className="text-gray-700 font-bold">{`Rp. ${product.harga}`}</p>
                          <p
                            className={`capitalize ${
                              categoryStyles[product.category]
                            } `}
                          >
                            {product.category}
                          </p>
                        </div>
                        <h6
                          className="text-gray-700 text-sm overflow-hidden relative"
                          onMouseEnter={() => handleHover(product._id, true)}
                          onMouseLeave={() => handleHover(product._id, false)}
                        >
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out ${
                              hoveredProducts[product._id]
                                ? "transform translate-y-[-100%]"
                                : "transform translate-y-0"
                            }`}
                          >
                            {product.alamatusaha}
                          </span>
                          <span
                            className={`capi block transition-transform duration-300 ease-in-out absolute top-0 left-0 ${
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
