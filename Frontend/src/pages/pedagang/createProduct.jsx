import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../components/containers/navbar/navbar";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import Footer from "../../components/containers/footer/footer";
import { Link } from "react-router-dom";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function CreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    harga: "",
    images: [],
    previewImages: [],
    category: "",
    linkecommerences: [""],
    isApproved: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setProductData({
      ...productData,
      images: files,
      previewImages: previewUrls,
    });
  };

  // Menangani perubahan linkecommerences
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...productData.linkecommerences];
    updatedLinks[index] = value;
    setProductData({
      ...productData,
      linkecommerences: updatedLinks,
    });
  };

  // Menambahkan field link baru
  const handleAddLink = () => {
    setProductData({
      ...productData,
      linkecommerences: [...productData.linkecommerences, ""],
    });
  };

  // Menghapus field link tertentu
  const handleRemoveLink = (index) => {
    const updatedLinks = productData.linkecommerences.filter(
      (_, i) => i !== index
    );
    setProductData({
      ...productData,
      linkecommerences: updatedLinks,
    });
  };

  // Menambahkan auto-resize pada textarea
  const handleAutoResize = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height sesuai scrollHeight
  };

  // Menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("harga", productData.harga);
      formData.append("category", productData.category);

      productData.linkecommerences.forEach((link) => {
        if (link.trim() !== "") {
          formData.append("linkecommerences[]", link);
        }
      });

      // Menambahkan gambar satu per satu ke FormData
      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(`${apiroutes}/products/createproduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setProductData({
          name: "",
          description: "",
          harga: "",
          images: [],
          category: "",
          linkecommerences: [""],
          isApproved: "pending",
        });

        setTimeout(() => {
          navigate("/products/pedagang");
        }, 1500);
      } else {
        setError(data.message || "Gagal menambahkan produk");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menambahkan produk");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="flex flex-col md:flex-row h-screen">
        <SidebarPedagang />

        <article className="w-full md:w-[80%] pt-5 px-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
              Tambah Produk Baru
            </h1>
            <Link
              to={"/products/create"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 text-center"
            >
              Tambah Produk
            </Link>
          </section>

          {loading ? (
            <p className="text-center text-gray-600">Membuat produk...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : success ? (
            <p className="text-center text-green-500">
              Produk berhasil ditambahkan!
            </p>
          ) : (
            <section>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-6"
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
                    onInput={handleAutoResize}
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
                    className="w-full bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
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

                {productData.previewImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {productData.previewImages.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="linkecommerences"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Link E-Commerce
                  </label>
                  {productData.linkecommerences.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="url"
                        name="linkecommerences"
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
                    className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg"
                  >
                    {loading ? "Menambahkan..." : "Tambah Produk"}
                  </button>
                </div>
              </form>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
