import { useState } from "react";
import image from "../image";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
import SearchResults from "../components/containers/marketplace/SearchResults"; // Import komponen baru

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Menambahkan state untuk memantau status pencarian
  const [filterLocation, setIsFilterLocation] = useState();

  const productsrec = [
    //ini buat fetch produk rekomendasi aja (klo gasalah ngambil dari klik terbanyak?)
    {
      id: 1,
      name: "Produk 1",
      image: "https://via.placeholder.com/300x200?text=Produk+1",
      price: "Rp 100.000",
      link: "https://example.com/produk1",
    },
    {
      id: 2,
      name: "Produk 2",
      image: "https://via.placeholder.com/300x200?text=Produk+2",
      price: "Rp 200.000",
      link: "https://example.com/produk2",
    },
    {
      id: 3,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+3",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 4,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 4,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
  ];

  const productsshop = [
    //ini buat fetch produk rekomendasi toko
    {
      id: 1,
      name: "Produk 1",
      image: "https://via.placeholder.com/300x200?text=Produk+1",
      price: "Rp 100.000",
      link: "https://example.com/produk1",
    },
    {
      id: 2,
      name: "Produk 2",
      image: "https://via.placeholder.com/300x200?text=Produk+2",
      price: "Rp 200.000",
      link: "https://example.com/produk2",
    },
    {
      id: 3,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+3",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 4,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 4,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
  ];

  const products = [
    //ini buat fetch semua produk yang ada di db ya bre
    {
      id: 1,
      name: "Produk 1",
      image: "https://via.placeholder.com/300x200?text=Produk+1",
      category: "Kuliner",
      location: "blimbing",
      price: "Rp 100.000",
      link: "https://example.com/produk1",
    },
    {
      id: 2,
      name: "Produk 2",
      image: "https://via.placeholder.com/300x200?text=Produk+2",
      category: "Fashion",
      location: "kedungkandang",
      price: "Rp 200.000",
      link: "https://example.com/produk2",
    },
    {
      id: 3,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+3",
      category: "Pertanian",
      location: "klojen",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 4,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      category: "Kerajinan",
      location: "lowokwaru",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 5,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      category: "Digital",
      location: "klojen",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 6,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      category: "Fashion",
      location: "klojen",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
    {
      id: 7,
      name: "Produk 3",
      image: "https://via.placeholder.com/300x200?text=Produk+4",
      category: "Fashion",
      location: "sukun",
      price: "Rp 300.000",
      link: "https://example.com/produk3",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Menghindari reload halaman
    setIsSearching(true); // Mulai pencarian
    setTimeout(() => {
      setIsSearching(false); // Hentikan animasi loading setelah pencarian selesai
    }, 2000); // Set waktu delay untuk animasi loading (2 detik)
  };

  const handleCategoryClick = (category) => {
    // Isi searchQuery dengan kategori yang diklik dan mulai pencarian
    setSearchQuery(category);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500); // Set waktu delay untuk animasi loading
  };

  const handleLocationClick = () => {
    setIsFilterLocation(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500); // Set waktu delay untuk animasi loading
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-max bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 py-10">
        <div className="relative flex items-center max-w-full px-4 sm:px-6 lg:px-8 mx-auto w-full pb-10">
          {/* Filter Lokasi */}

          {/* Searchbar */}
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
          <SearchResults searchQuery={searchQuery} products={products} />
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
            <produk id="produk" className="">
              <h4 className=" px-5 text-2xl font-bold">Rekomendasi</h4>
              <section id="recomendation" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {productsrec.map((product) => (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={product.id}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-100 transform hover:scale-105"
                    >
                      <div className="w-full aspect-w-4 aspect-h-3">
                        <img
                          className="w-full h-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h5>
                        <p className="mt-2 text-gray-700 text-sm">
                          {product.price}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
              <br />
              <h4 className="px-5 text-2xl font-bold">Dari Toko Unggulan</h4>
              <br />
              <section id="unggulan" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {productsshop.map((product) => (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={product.id}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-100 transform hover:scale-105"
                    >
                      <div className="w-full aspect-w-4 aspect-h-3">
                        <img
                          className="w-full h-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h5>
                        <p className="mt-2 text-gray-700 text-sm">
                          {product.price}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
              <br />
              <h4 className="px-5 text-2xl font-bold">Semua Produk</h4>
              <br />
              <section id="unggulan" className="my-6 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {products.map((product) => (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={product.id}
                      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-100 transform hover:scale-105"
                    >
                      <div className="w-full aspect-w-4 aspect-h-3">
                        <img
                          className="w-full h-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h5>
                        <p className="mt-2 text-gray-700 text-sm">
                          {product.price}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </produk>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
