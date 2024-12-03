import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarPedagang from "../../components/containers/sidebar/sidebarPedagang";
import LoaderPage from "../../components/elements/loading";
import SuccessAlert from "../../components/elements/successalert";
import ErrorAlert from "../../components/elements/erroralert";

export default function SettingsPedagang() {
  const [userData, setUserData] = useState({
    owner: "",
    email: "",
    notelepon: "",
    namausaha: "",
    alamatusaha: "",
    category: "",
    description: "",
    linkecommerences: "",
    profilepict: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ambil token dari localStorage atau context
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/user/getuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          owner: data.owner,
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

  const [preview, setPreview] = useState(null); // State untuk pratinjau gambar

  // Fungsi untuk menangani perubahan file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Ambil file pertama yang dipilih

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("owner", userData.owner);
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
    const phoneRegex = /^(?:\+62|62|0)(?:8[1-9])[0-9]{7,11}$/;

    if (!phoneRegex.test(userData.notelepon)) {
      setError(
        "Nomor telepon tidak valid. Pastikan nomor telepon Indonesia benar."
      );
      return;
    }
    fetch("http://localhost:5000/api/user/editpedagang", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
        setUserData((prevData) => ({
          ...prevData,
          profilepict: data.user.profilepict, // Pastikan backend mengembalikan URL gambar baru
        }));
      })
      .catch((err) => {
        setSuccess(false);
      });
  };

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false); // Sembunyikan notifikasi setelah 5 detik (5000 ms)
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(false); // Sembunyikan notifikasi setelah 5 detik (5000 ms)
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <SidebarPedagang />
        <article className="w-[80%] pt-5 pb-10 border-2 shadow-sm my-5 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-50 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Akun UMKM Anda</h5>
            <h6 className="text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi, dan
              mengamankan akun
            </h6>
          </div>
          <form
            className="grid grid-cols-2"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <section className="flex flex-col px-5 my-10 gap-5 border-r-2 border-gray-400">
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
                <label htmlFor="owner">Nama Pemilik</label>
                <input
                  className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  type="text"
                  name="owner"
                  id="owner"
                  value={userData.owner}
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
            <div className="flex gap-10 px-5">
              <button
                type="submit"
                className="mt-5 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out"
              >
                Simpan Perubahan
              </button>
              <Link className="mt-5 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out">
                Ubah Password
              </Link>
            </div>
          </form>
        </article>
        {success && <SuccessAlert func={() => setSuccess(false)}/>}
        {error && <ErrorAlert error={error} func={() => setError(false)} />}
      </main>
      <Footer />
    </>
  );
}
