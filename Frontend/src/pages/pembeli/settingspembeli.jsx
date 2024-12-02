import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import SidebarPembeli from "../../components/containers/sidebar/sidebarPembeli";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../../components/elements/loading";

export default function SettingsPembeli() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    notelepon: "",
    jeniskelamin: "",
    tanggallahir: "",
    profilepict: "",
  });

  const [success, setSuccess] = useState(false);
  const [gender, setGender] = useState();
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
          name: data.name,
          username: data.username,
          email: data.email,
          notelepon: data.notelepon,
          jeniskelamin: data.jeniskelamin,
          tanggallahir: data.tanggallahir,
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
    formData.append("name", userData.name);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("notelepon", userData.notelepon);
    formData.append("jeniskelamin", userData.jeniskelamin);
    formData.append("tanggallahir", userData.tanggallahir);
    if (userData.profilepict instanceof File) {
      formData.append("profilepict", userData.profilepict);
    }

    fetch("http://localhost:5000/api/user/editpembeli", {
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

  if (loading) {
    return <LoaderPage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const inputField = (label, id, type, value) => (
    <div className="flex items-center">
      <label className="w-1/4 text-xl" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-[60%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        type={type}
        value={value ?? ""}
        name={id}
        id={id}
        placeholder={label}
        onChange={handleChange}
      />
    </div>
  );

  const radioButton = (id, label, checked, onChange) => (
    <div className="flex items-center gap-3">
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        type="radio"
        value={id}
        name="jeniskelamin"
        id={id}
        checked={userData.jeniskelamin === id}
        onChange={(e) =>
          setUserData({ ...userData, jeniskelamin: e.target.value })
        }
      />
      <label className="text-xl" htmlFor={id}>
        {label}
      </label>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="relative flex h-screen">
        <SidebarPembeli />
        <article className="w-[80%] pt-5 pb-10 border-2 shadow-sm my-5 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Pengaturan Akun Saya</h5>
            <h6 className="text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi dan
              mengamankan akun
            </h6>
          </div>
          <section className="flex flex-col px-5 my-10 gap-5">
            <form
              className=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <section className="grid grid-cols-2">
                <div className="flex flex-col gap-5">
                  {inputField("Nama", "name", "text", userData.name)}
                  {inputField(
                    "Username",
                    "username",
                    "text",
                    userData.username
                  )}
                  {inputField("Email", "email", "email", userData.email)}
                  {inputField(
                    "No Telepon",
                    "notelepon",
                    "tel",
                    userData.notelepon
                  )}

                  <div className="flex items-center">
                    <h6 className="w-1/4 text-xl">Jenis Kelamin</h6>
                    <div className="flex items-center gap-3 mr-10">
                      {radioButton(
                        "laki-laki",
                        "Laki-laki",
                        gender === "laki-laki",
                        () => setGender("laki-laki")
                      )}
                      {radioButton(
                        "perempuan",
                        "Perempuan",
                        gender === "perempuan",
                        () => setGender("perempuan")
                      )}
                    </div>
                  </div>

                  {inputField(
                    "Tanggal Lahir",
                    "tanggallahir",
                    "date",
                    userData.tanggallahir
                      ? new Date(userData.tanggallahir)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  )}
                </div>

                <div className="flex flex-col items-center gap-5 self-center">
                  <img
                    className="rounded-full w-60 h-60"
                    src={preview || userData.profilepict}
                    alt="imgprofile"
                  />
                  <label
                    className="w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-lg py-2 px-5 cursor-pointer hover:bg-gray-200 hover:translate-y-1 transition-all duration-200 ease-in-out"
                    htmlFor="profilepict"
                  >
                    Ganti Foto Profile
                  </label>
                  <input
                    type="file"
                    name="profilepict"
                    id="profilepict"
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                  />
                </div>
              </section>

              <div className="flex gap-10">
                <button
                  type="submit"
                  className="mt-5 w-1/4 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out"
                >
                  Simpan Perubahan
                </button>
                <Link className="mt-5 w-1/4 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-5 hover:bg-violet-700 transition-colors duration-300 ease-out">
                  Ubah Password
                </Link>
              </div>
            </form>
            <h5 className="text-red-500 font-bold text-lg mt-5">
              Minta Penghapusan Akun
            </h5>
            <button className="mt-5 w-1/4 text-center text-lg bg-red-500 text-white font-semibold py-2 px-5 hover:bg-red-700 transition-colors duration-300 ease-out">
              Menghapus Akun
            </button>
          </section>
        </article>
        {success && (
          <div className="absolute bottom-10 right-10 flex w-96 shadow-lg rounded-lg">
            <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white fill-current"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
            </div>
            <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
              <div>Berhasil mengubah profil</div>
              <button onClick={() => setSuccess(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-gray-700"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
