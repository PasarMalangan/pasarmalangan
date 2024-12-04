import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/containers/navbar/navbar";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import Footer from "../../components/containers/footer/footer";

export default function EditProduct() {
  const { id } = useParams(); // Ambil ID produk dari URL
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    harga: "",
    images: [],
    previewImages: [],
    category: "",
    linkecommerences: [""],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Ambil data produk saat komponen dimuat
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          // Ubah state menjadi objek pertama dari array
          setProductData({...data[0],  previewImages: data[0].images}); // Ambil hanya objek pertama
        } else {
          setError(data.message || "Gagal mengambil data produk");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data produk");
      }
    };
    fetchProduct();
  }, [id]);

  // Menangani perubahan input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Menangani perubahan link E-Commerce
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...productData.linkecommerences];
    updatedLinks[index] = value;
    setProductData({ ...productData, linkecommerences: updatedLinks });
  };

  // Menambah link E-Commerce
  const handleAddLink = () => {
    setProductData((prevData) => ({
      ...prevData,
      linkecommerences: [...prevData.linkecommerences, ""],
    }));
  };

  // Menghapus link E-Commerce tertentu
  const handleRemoveLink = (index) => {
    const updatedLinks = productData.linkecommerences.filter(
      (_, i) => i !== index
    );
    setProductData({ ...productData, linkecommerences: updatedLinks });
  };

  // Menangani perubahan gambar baru
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setProductData((prevData) => ({
      ...prevData,
      images: files,
      previewImages: previewUrls,
    }));
  };

  // Fungsi submit untuk update produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Memasukkan semua data ke dalam FormData
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("harga", productData.harga);
    formData.append("category", productData.category);
    productData.linkecommerences.forEach((link) =>
      formData.append("linkecommerences[]", link)
    );
    productData.images.forEach((image) => formData.append("images", image));

    try {
  const response = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(jsonData.message || "Gagal memperbarui produk");
  }

  setSuccess(true);
  setTimeout(() => navigate("/products/pedagang"), 1500);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}

  };
  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <SidebarPedagang />
        <article className="w-[80%] pt-5 px-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <section className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Edit Produk
            </h1>
          </section>

          {loading ? (
            <p className="text-center text-gray-600">Memproses...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : success ? (
            <p className="text-center text-green-500">
              Produk berhasil diperbarui!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded resize-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="harga"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Harga
                </label>
                <input
                  type="number"
                  name="harga"
                  id="harga"
                  value={productData.harga}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  required
                >
                  <option value="" disabled>
                    Pilih kategori produk
                  </option>
                  <option value="kuliner">Kuliner</option>
                  <option value="fashion">Fashion</option>
                  <option value="pertanian">Pertanian</option>
                  <option value="kerajinan">Kerajinan</option>
                  <option value="digital">Digital</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="images"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Gambar Produk
                </label>
                <input
                  name="images"
                  id="images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                  accept=".jpg, .png, .jpeg"
                />
              </div>

              {/* Pratinjau gambar */}
              {productData.previewImages &&
                productData.previewImages.length > 0 && (
                  <div className="flex space-x-4 mt-2">
                    {productData.previewImages.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}

              {/* Link E-Commerce */}
              <div>
                <label
                  htmlFor="linkecommerences"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Link E-Commerce
                </label>
                {productData.linkecommerences &&
                  productData.linkecommerences.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="url"
                        value={link}
                        onChange={(e) =>
                          handleLinkChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        placeholder="Masukkan link"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(index)}
                        className="text-red-500"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-blue-600"
                >
                  Tambah Link
                </button>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
