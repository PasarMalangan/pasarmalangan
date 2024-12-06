import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
import { useState } from "react";
const apiroutes = import.meta.env.VITE_API_BASE_URL;

export default function RegPedagang() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [namausaha, setNamausaha] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notelepon, setNotelepon] = useState("");
  const [alamatusaha, setAlamatusaha] = useState("");
  const [identitaspedagang, setIdentitaspedagang] = useState(null);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const role = "pedagang";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIdentitaspedagang(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Validasi nomor telepon
    const phoneRegex = /^(?:\+62|62|0)(?:8[1-9])[0-9]{7,11}$/;
    if (!phoneRegex.test(notelepon)) {
      setError(
        "Nomor telepon tidak valid. Pastikan nomor telepon Indonesia benar."
      );
      return;
    }

    // Validasi konfirmasi password
    if (password !== rePassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (password.length < 8) {
      setError("Password harus terdiri dari minimal 8 karakter!");
      return;
    }

    // Validasi file
    if (!identitaspedagang) {
      setError("Silakan unggah KTP terlebih dahulu.");
      return;
    }

    // Menyusun data form yang akan dikirim
    const formData = new FormData();
    formData.append("email", email);
    formData.append("namausaha", namausaha);
    formData.append("name", name);
    formData.append("notelepon", notelepon);
    formData.append("alamatusaha", alamatusaha);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("identitaspedagang", identitaspedagang); // Kirim file KTP

    // Set loading menjadi true saat submit
    setIsLoading(true);

    try {
      const response = await fetch(`${apiroutes}/auth/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registrasi gagal!");
      }

      const responseData = await response.json();
      setSuccess(responseData.message);
      setError("");
      // Reset form fields
      setNamausaha("");
      setName("");
      setEmail("");
      setNotelepon("");
      setAlamatusaha("");
      setIdentitaspedagang(null); // Reset file
      setPassword("");
      setRePassword("");
    } catch (error) {
      setSuccess("");
      setError(error.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      // Set loading menjadi false setelah proses selesai
      setIsLoading(false);
    }
  };

  const inputField = (type, value, id, label, setter) => (
    <input
      className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
      type={type}
      value={value ?? ""}
      name={id}
      id={id}
      placeholder={label}
      onChange={setter}
    />
  );

  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-[90%] h-max p-10">
            <div className="flex w-full justify-center">
              <div className="w-full bg-white px-9 py-5">
                <form
                  className="w-full mx-auto"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <p className="font-semibold text-xl text-center mb-5">
                    DAFTAR SEBAGAI PEDAGANG UMKM
                  </p>
                  {error && <div className="text-red-500">{error}</div>}
                  {success && <div className="text-green-500">{success}</div>}
                  <section className="w-full grid grid-cols-2 gap-10 mx-auto">
                    <div className="flex flex-col gap-5">
                      {inputField(
                        "text",
                        namausaha,
                        "namausaha",
                        "Nama Usaha",
                        (e) => setNamausaha(e.target.value)
                      )}
                      {inputField(
                        "text",
                        name,
                        "name",
                        "Nama Pemilik Usaha",
                        (e) => setName(e.target.value)
                      )}
                      {inputField(
                        "email",
                        email,
                        "email",
                        "Alamat Email Usaha",
                        (e) => setEmail(e.target.value)
                      )}
                      {inputField(
                        "tel",
                        notelepon,
                        "notelepon",
                        "Nomor Telepon",
                        (e) => setNotelepon(e.target.value)
                      )}
                    </div>
                    <div className="flex flex-col gap-5">
                      {inputField(
                        "text",
                        alamatusaha,
                        "alamatusaha",
                        "Alamat Usaha",
                        (e) => setAlamatusaha(e.target.value)
                      )}
                      <div className="border-[1px] border-slate-700 px-4 py-2 w-full">
                        <label
                          className="text-gray-500 cursor-pointer w-full block"
                          htmlFor="identitaspedagang"
                        >
                          Unggah KTP
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          name="identitaspedagang"
                          id="identitaspedagang"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                        {identitaspedagang && (
                          <p className="mt-2 text-sm text-gray-600">
                            File dipilih: {identitaspedagang.name}
                          </p>
                        )}
                      </div>
                      {inputField(
                        "password",
                        password,
                        "password",
                        "Masukkan Password Baru",
                        (e) => setPassword(e.target.value)
                      )}
                      {inputField(
                        "password",
                        rePassword,
                        "rePassword",
                        "Konfirmasi Password Baru",
                        (e) => setRePassword(e.target.value)
                      )}
                    </div>
                  </section>
                  <button
                    type="submit"
                    className={`w-[50%] mx-auto translate-x-1/2 mt-10 mb-5 bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out ${
                      isLoading ? "bg-violet-400 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading} // Disable tombol selama loading
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          ></circle>
                          <path
                            d="M4 12a8 8 0 1 0 16 0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="ml-2">Loading...</span>
                      </span>
                    ) : (
                      "Daftar"
                    )}
                  </button>
                </form>
                <p className="w-full text-center">
                  Sudah Punya Akun?{" "}
                  <span className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out">
                    <Link to={"/login"}>Login</Link>
                  </span>
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
