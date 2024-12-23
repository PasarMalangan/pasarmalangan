import Footer from "../../components/containers/footer/footer";
import Navbar from "../../components/containers/navbar/navbar";
import SidebarPembeli from "../../components/containers/sidebar/sidebarPembeli";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../../components/elements/loading";
import SuccessAlert from "../../components/elements/successalert";
import ErrorAlert from "../../components/elements/erroralert";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

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

  const [success, setSuccess] = useState(null);
  const [gender, setGender] = useState();
  const [loadingGet, setLoadingGet] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (userData.jeniskelamin) {
      setGender(userData.jeniskelamin);
    }
  }, [userData.jeniskelamin]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan.");
        setLoadingGet(false);
        return;
      }

      try {
        const response = await fetch(`${apiroutes}/user/getuser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna.");
        }

        const data = await response.json();

        setUserData({
          name: data.name,
          username: data.username,
          email: data.email,
          notelepon: data.notelepon,
          jeniskelamin: data.jeniskelamin,
          tanggallahir: data.tanggallahir,
          profilepict: data.profilepict,
        });
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data pengguna.");
        console.error(err);
      } finally {
        setLoadingGet(false);
      }
    };

    fetchData();
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
    if (!token) {
      console.error("Token tidak ditemukan.");
      setSuccess(false);
      setIsLoading(false);
      return;
    }

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

    setIsLoading(true);

    try {
      const response = await fetch(`${apiroutes}/user/editpembeli`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data pengguna.");
      }

      const data = await response.json();

      setSuccess(data.message);
      setUserData((prevData) => ({
        ...prevData,
        profilepict: data.user.profilepict, // Pastikan backend mengembalikan URL gambar baru
      }));
    } catch (err) {
      setError(err.message);
      console.error(err);
      setSuccess(false);
    } finally {
      setIsLoading(false);
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

  if (loadingGet) {
    return <LoaderPage />;
  }

  const inputField = (label, id, type, value) => (
    <div className="flex items-center">
      <label className="w-1/4 text-xl mr-3" htmlFor={id}>
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
        checked={checked}
        onChange={() => onChange(id)}
      />
      <label className="text-xl" htmlFor={id}>
        {label}
      </label>
    </div>
  );

  const handleGenderChange = (value) => {
    setGender(value);
    setUserData((prevData) => ({
      ...prevData,
      jeniskelamin: value,
    }));
  };

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="relative flex flex-col md:flex-row h-screen">
        <SidebarPembeli />
        <article className="w-full md:w-[80%] pt-5 pb-10 border-2 shadow-sm my-5 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="w-full border-b-2 border-black px-5">
            <h5 className="font-bold text-2xl">Pengaturan Akun Saya</h5>
            <h6 className="text-lg md:text-xl py-2">
              Kelola informasi profil Anda untuk mengontrol, melindungi dan
              mengamankan akun
            </h6>
          </div>
          <section className="flex flex-col px-5 my-10 gap-5">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <h6 className="text-lg md:text-xl mr-5">Jenis Kelamin</h6>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      {radioButton(
                        "laki-laki",
                        "Laki-laki",
                        gender === "laki-laki",
                        handleGenderChange
                      )}
                      {radioButton(
                        "perempuan",
                        "Perempuan",
                        gender === "perempuan",
                        handleGenderChange
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
                    className="rounded-full w-40 h-40 sm:w-60 sm:h-60"
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

              <div className="flex flex-row gap-5 sm:gap-10 mt-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`rounded-md w-full md:w-max text-center md:text-lg bg-violet-500 text-white font-semibold py-2 px-2 md:px-5 
            ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-violet-700"
            } transition-colors duration-300 ease-out`}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </button>

                <Link to={"/forgotpassword"} className="rounded-md w-full md:w-max sm:w-1/4 text-center text-lg bg-violet-500 text-white font-semibold py-2 px-2 md:px-5 hover:bg-violet-700 transition-colors duration-300 ease-out">
                  Ubah Password
                </Link>
              </div>
            </form>
            <h5 className="text-red-500 font-bold text-lg mt-5">
              Minta Penghapusan Akun
            </h5>
            <button className="rounded-md w-full sm:w-1/4 text-center text-lg bg-red-500 text-white font-semibold py-2 px-5 hover:bg-red-700 transition-colors duration-300 ease-out">
              Menghapus Akun
            </button>
          </section>
        </article>
      </main>

      {success && (
        <SuccessAlert success={success} func={() => setSuccess(false)} />
      )}
      {error && <ErrorAlert error={error} func={() => setError(false)} />}
      <Footer />
    </>
  );
}