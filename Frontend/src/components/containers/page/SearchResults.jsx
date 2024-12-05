import { useState, useEffect } from "react";

// Komponen untuk menampilkan produk hasil pencarian
const SearchResults = ({ searchQuery, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Menampilkan animasi loading saat proses pencarian
    setLoading(true);

    // Proses filter produk berdasarkan query
    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setLoading(false); // Menghentikan animasi loading setelah selesai
    }, 500); // Menunggu 500ms agar animasi loading terlihat

    return () => clearTimeout(timer); // Bersihkan timeout jika searchQuery berubah
  }, [searchQuery, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-500 border-solid" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {filteredProducts.length === 0 ? (
        <p className="text-center col-span-4">Produk tidak ditemukan.</p>
      ) : (
        filteredProducts.map((product) => (
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
              <p className="mt-2 text-gray-700 text-sm">{product.price}</p>
            </div>
          </a>
        ))
      )}
    </div>
  );
};

export default SearchResults;
