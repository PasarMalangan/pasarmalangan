import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ApproveProduk = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const apiroutes = import.meta.env.VITE_API_BASE_URL;
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiroutes}/products/getallproducts`);

      if (!response.ok) {
        throw new Error("Gagal memuat produk");
      }

      const data = await response.json();
      setProductList(data);

      // Terapkan filter yang ada setelah produk dimuat
      applyFilter(selectedStatus, data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (status, products) => {
    if (status === "all") {
      setFilteredProducts(products); // Tampilkan semua produk
    } else {
      const filtered = products.filter(
        (product) => product.isApproved === status
      );
      setFilteredProducts(filtered); // Filter produk sesuai status
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (status) => {
    setSelectedStatus(status); // Update status yang dipilih
    applyFilter(status, productList); // Terapkan filter setelah status berubah
  };

  const updateStatus = async (productId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiroutes}/products/updateStatus/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isApproved: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui status produk");
      }

      // Update product list locally
      setProductList((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isApproved: newStatus }
            : product
        )
      );

      // Terapkan filter setelah status produk diubah
      applyFilter(selectedStatus, productList);
      setAlertMessage(`Status produk berhasil diubah menjadi ${newStatus}`);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(`Terjadi kesalahan: ${error.message}`);
      setIsSuccess(false);
      setShowAlert(true);
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-blue-600 text-lg">Memperbarui status...</p>
          </div>
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Manajemen Produk</h2>

      <div className="flex justify-between mb-4">
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border rounded px-2 py-1"
          value={selectedStatus}
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="disetujui">Disetujui</option>
          <option value="ditolak">Ditolak</option>
        </select>

        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4">Nama Usaha</th>
            <th className="py-2 px-4">Nama Produk</th>
            <th className="py-2 px-4">Harga</th>
            <th className="py-2 px-4">Gambar</th>
            <th className="py-2 px-4">Deskripsi</th>
            <th className="py-2 px-4">Link</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4">{product.namausaha}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.harga}</td>
              <td className="py-2 px-4">
                <img
                  src={product.images && product.images[0]}
                  alt="Gambar Produk"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4 min-w-48 max-w-52 min-h-3 overflow-y-auto break-words">
                {product.description}
              </td>

              <td className="py-2 px-4">
                {product.linkecommerences &&
                  product.linkecommerences.map((link, i) => {
                    const displayLink =
                      link.length > 30 ? link.substring(0, 30) + "..." : link;

                    return (
                      <Link
                        key={i}
                        to={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline block"
                      >
                        {displayLink}
                      </Link>
                    );
                  })}
              </td>

              <td className="py-2 px-4">{product.isApproved}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => updateStatus(product._id, "disetujui")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Setujui
                </button>
                <button
                  onClick={() => updateStatus(product._id, "ditolak")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Tolak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            {isSuccess ? (
              <div className="flex justify-center mb-4 animate-bounce">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex justify-center mb-4 animate-shake">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}

            <p className="text-gray-800 mb-4">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApproveProduk;