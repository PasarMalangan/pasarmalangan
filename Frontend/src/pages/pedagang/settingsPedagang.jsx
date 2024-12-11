import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import LoaderPage from "../../components/elements/loading";
import SuccessAlert from "../../components/elements/successalert";
import ErrorAlert from "../../components/elements/erroralert";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function SettingsPedagang() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    notelepon: "",
    namausaha: "",
    alamatusaha: "",
    category: "",
    description: "",
    linkecommerences: "",
    profilepict: "",
  });
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan.");
      setLoading(false);
      return;
    }

    fetch(`${apiroutes}/user/getuser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          name: data.name,
          email: data.email,
          notelepon: data.notelepon,
          namausaha: data.namausaha,
          alamatusaha: data.alamatusaha,
          category: data.category,
          description: data.description,
          linkecommerences: data.linkecommerences,
          profilepict: data.profilepict,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Terjadi kesalahan saat mengambil data pengguna.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Buat URL blob untuk pratinjau
      const objectUrl = URL.createObjectURL(selectedFile);

      // Simpan URL blob ke state pratinjau
      setPreview(objectUrl);

      // Simpan file asli ke state userData
      setUserData((prevData) => ({
        ...prevData,
        profilepict: selectedFile,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const phoneRegex = /^(?:\+62|62|0)(?:8[1-9])[0-9]{7,11}$/;

    // Validasi nomor telepon
    if (!phoneRegex.test(userData.notelepon)) {
      setError(
        "Nomor telepon tidak valid. Pastikan nomor telepon Indonesia benar."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("notelepon", userData.notelepon);
    formData.append("namausaha", userData.namausaha);
    formData.append("alamatusaha", userData.alamatusaha);
    formData.append("category", userData.category);
    formData.append("description", userData.description);
    formData.append("linkecommerences", userData.linkecommerences);

    if (userData.profilepict instanceof File) {
      formData.append("profilepict", userData.profilepict);
    }

    setLoadingSubmit(true);
    setError(null);

    try {
      const response = await fetch(`${apiroutes}/user/editpedagang`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui data pengguna.");
      }

      setSuccess(data.message);
      setUserData((prevData) => ({
        ...prevData,
        profilepict: data.user.profilepict, // Perbarui foto profil
      }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengirim data.");
      setSuccess(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="flex flex-col md:flex-row h-screen">
        <SidebarPedagang />
        <article className="w-full md:w-[80%] pt-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Akun UMKM Anda</h5>
            <h6 className="text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi, dan
              mengamankan akun
            </h6>
          </div>
          <form
            className="grid grid-cols-1 lg:grid-cols-2"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <section className="flex flex-col px-5 my-10 gap-5 border-r-0 lg:border-r-2 border-gray-400">
              {/* Input fields */}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-5"
                type="text"
                name="namausaha"
                id="namausaha"
                value={userData.namausaha}
                onChange={handleChange}
                placeholder="Nama Usaha"
              />
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-5"
                name="description"
                id="description"
                value={userData.description}
                onChange={handleChange}
                placeholder="Deskripsi Usaha..."
              />
              <div className="flex items-center justify-between">
                <label htmlFor="name">Nama Pemilik</label>
                <input
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Nama Pemilik"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="email">Alamat Email</label>
                <input
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Alamat Email"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="notelepon">No Handphone</label>
                <input
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  type="tel"
                  name="notelepon"
                  id="notelepon"
                  value={userData.notelepon}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="category" className="">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={userData.category || ""}
                  onChange={handleChange}
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="" disabled selected={!userData.category}>
                    Pilih kategori usaha
                  </option>

                  <option value="kuliner">Kuliner</option>
                  <option value="fashion">Fashion</option>
                  <option value="pertanian">Pertanian</option>
                  <option value="kerajinan">Kerajinan</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="alamatusaha">Alamat Usaha</label>
                <input
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  type="text"
                  name="alamatusaha"
                  id="alamatusaha"
                  value={userData.alamatusaha}
                  onChange={handleChange}
                  placeholder="Alamat Usaha"
                />
              </div>
            </section>
            <section className="flex flex-col items-center gap-5 self-center">
              <img
                className="rounded-full w-60 h-60"
                src={preview || userData.profilepict}
                alt="imgprofile"
              />
              <label
                className="w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-lg py-2 px-5 cursor-pointer hover:bg-gray-200 hover:translate-y-1 transition-all duration-200 ease-in-out"
                htmlFor="profilepict"
              >
                Ganti Logo Usaha
              </label>
              <input
                type="file"
                name="profilepict"
                id="profilepict"
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </section>
            <div className="flex flex-wrap gap-5 md:gap-10 px-5">
              <button
                type="submit"
                disabled={loadingSubmit}
                className={`rounded-lg mt-5 text-center md:text-lg py-2 px-5 font-semibold transition-colors duration-300 ease-out ${
                  loadingSubmit
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-violet-500 text-white hover:bg-violet-700"
                }`}
              >
                {loadingSubmit ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin border-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 76 75"
                      fill="none"
                    >
                      <circle
                        cx="38.0004"
                        cy="37.1953"
                        r="28"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <path
                        d="M49.8079 62.5848C53.142 61.0342 56.138 58.842 58.6248 56.1335C61.1117 53.425 63.0407 50.2532 64.3018 46.7992C65.5629 43.3452 66.1313 39.6767 65.9745 36.003C65.8178 32.3293 64.939 28.7225 63.3884 25.3884C61.8378 22.0544 59.6456 19.0584 56.9371 16.5715C54.2286 14.0847 51.0568 12.1556 47.6028 10.8946C44.1488 9.63351 40.4802 9.06511 36.8066 9.22183C33.1329 9.37855 29.5261 10.2573 26.192 11.808"
                        stroke="url(#paint0_linear_13416_7443)"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_13416_7443"
                          x1="0.803595"
                          y1="23.6159"
                          x2="24.4195"
                          y2="74.3928"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4F46E5" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>

              <Link className="rounded-lg mt-5 text-center md:text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out">
                Ubah Password
              </Link>
            </div>
          </form>
        </article>
        {success && (
          <SuccessAlert success={success} func={() => setSuccess(false)} />
        )}
        {error && <ErrorAlert error={error} func={() => setError(false)} />}
      </main>
      <Footer />
    </>
  );
}