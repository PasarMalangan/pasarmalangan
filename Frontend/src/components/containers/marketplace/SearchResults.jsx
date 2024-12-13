import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ searchQuery, products }) => {
  const [selectedLocations, setSelectedLocations] = useState({
    klojen: false,
    blimbing: false,
    kedungkandang: false,
    lowokwaru: false,
    sukun: false,
  });

  const [hoveredProducts, setHoveredProducts] = useState({});

  const categoryStyles = {
    kuliner: "bg-red-500 text-white font-medium px-2 py-[2px] rounded-lg",
    fashion: "bg-blue-700 text-white font-medium px-2 py-[2px] rounded-lg",
    pertanian: "bg-green-500 text-white font-medium px-2 py-[2px] rounded-lg",
    kerajinan: "bg-yellow-500 text-white font-medium px-2 py-[2px] rounded-lg",
    digital: "bg-cyan-500 text-white font-medium px-2 py-[2px] rounded-lg",
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter((product) => {
      const locationMatches =
        selectedLocations[product.alamatusaha.toLowerCase()] ||
        Object.values(selectedLocations).every((loc) => !loc);

      return (
        (product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)) &&
        locationMatches
      );
    });
  }, [searchQuery, products, selectedLocations]);

  const handleLocationChange = (event) => {
    const { name, checked } = event.target;
    setSelectedLocations((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleHover = (id, isHovered) => {
    setHoveredProducts((prev) => ({ ...prev, [id]: isHovered }));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter lokasi */}
      <div className="w-full lg:w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6">
        <h5 className="text-lg font-bold text-gray-900 mb-4">Filter Lokasi</h5>
        {Object.keys(selectedLocations).map((location) => (
          <div key={location} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={location}
              checked={selectedLocations[location]}
              onChange={handleLocationChange}
              id={location}
              className="mr-2"
            />
            <label
              htmlFor={location}
              className="text-sm text-gray-700 capitalize"
            >
              {location}
            </label>
          </div>
        ))}
      </div>

      {/* Hasil pencarian */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">Produk tidak ditemukan.</p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/detailproduk/${product._id}`}
              target="_blank"
              rel="noopener noreferrer"
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
