import { useState } from "react";
import image from "../image";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
import SearchResults from "../components/containers/page/SearchResults"; // Import komponen baru

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Menambahkan state untuk memantau status pencarian

  const productsrec = [ //ini buat fetch produk rekomendasi aja (klo gasalah ngambil dari klik terbanyak?)
    { id: 1, name: "Produk 1", image: "https://via.placeholder.com/300x200?text=Produk+1", price: "Rp 100.000", link: "https://example.com/produk1" },
    { id: 2, name: "Produk 2", image: "https://via.placeholder.com/300x200?text=Produk+2", price: "Rp 200.000", link: "https://example.com/produk2" },
    { id: 3, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+3", price: "Rp 300.000", link: "https://example.com/produk3" },
    { id: 4, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+4", price: "Rp 300.000", link: "https://example.com/produk3" },
  ];

  const productsshop = [ //ini buat fetch produk rekomendasi toko
    { id: 1, name: "Produk 1", image: "https://via.placeholder.com/300x200?text=Produk+1", price: "Rp 100.000", link: "https://example.com/produk1" },
    { id: 2, name: "Produk 2", image: "https://via.placeholder.com/300x200?text=Produk+2", price: "Rp 200.000", link: "https://example.com/produk2" },
    { id: 3, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+3", price: "Rp 300.000", link: "https://example.com/produk3" },
    { id: 4, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+4", price: "Rp 300.000", link: "https://example.com/produk3" },
  ];

  const products = [ //ini buat fetch semua produk yang ada di db ya bre
    { id: 1, name: "Produk 1", image: "https://via.placeholder.com/300x200?text=Produk+1", price: "Rp 100.000", link: "https://example.com/produk1" },
    { id: 2, name: "Produk 2", image: "https://via.placeholder.com/300x200?text=Produk+2", price: "Rp 200.000", link: "https://example.com/produk2" },
    { id: 3, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+3", price: "Rp 300.000", link: "https://example.com/produk3" },
    { id: 4, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+4", price: "Rp 300.000", link: "https://example.com/produk3" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Menghindari reload halaman
    setIsSearching(true); // Mulai pencarian
    setTimeout(() => {
      // Simulasi proses pencarian
      setIsSearching(false); // Hentikan animasi loading setelah pencarian selesai
    }, 2000); // Set waktu delay untuk animasi loading (2 detik)
  };

  const handleSearchBlur = () => {
    // Mengembalikan tampilan jika pengguna keluar dari input pencarian
    if (!searchQuery) {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-max bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 py-10 px-40">
        <div className="relative flex items-center max-w-full px-4 sm:px-6 lg:px-8 mx-auto w-full pb-10">
          <form
            onSubmit={handleSearchSubmit} // Pencarian dimulai saat tombol submit ditekan
            className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-transform duration-300 ease-in-out focus-within:scale-105 focus-within:shadow-xl focus-within:border-blue-600 hover:shadow-blue-300 hover:border-blue-400"
          >
            <input
              className="flex-1 px-6 py-3 placeholder:text-gray-400 placeholder:font-semibold text-lg text-gray-700 focus:outline-none"
              type="text"
              name="query"
              placeholder="Cari Produk UMKM Malang"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur} // Memanggil handleSearchBlur saat pengguna keluar dari input
            />
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full m-1 transition-all duration-150 ease-in-out"
            >
              <img className="w-6 h-6" src={image.icon_search} alt="Search" />
            </button>
          </form>
        </div>

        {/* Menampilkan animasi loading saat pencarian sedang dilakukan */}
        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
          </div>
        )}

        {/* Menampilkan hasil pencarian hanya jika sudah selesai dan query ada */}
        {!isSearching && searchQuery && (
          <SearchResults searchQuery={searchQuery} products={products} />
        )}

        {/* Tampilan kategori dan gambar hanya muncul jika pencarian tidak sedang berlangsung */}
        {!isSearching && !searchQuery && (
          <>
            <div>
              <ul className="flex justify-center gap-10">
                <li className="bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
                  Kuliner
                </li>
                <li className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
                  Fashion
                </li>
                <li className="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
                  Pertanian
                </li>
                <li className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
                  Kerajinan
                </li>
                <li className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
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
              <h4 className="text-2xl font-bold">Rekomendasi</h4>
              <section id="recomendation" className="my-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
              <h4 className="text-2xl font-bold">Dari Toko Unggulan</h4>
              <br />
              <section id="unggulan" className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
            </produk>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
