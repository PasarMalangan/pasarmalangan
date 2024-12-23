import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
import { useState, useEffect } from "react";
import ErrorAlert from "../components/elements/erroralert";
import SuccessAlert from "../components/elements/successalert";
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
  const [isLoading, setIsLoading] = useState(false);
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
    formData.append("identitaspedagang", identitaspedagang);

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
      setIdentitaspedagang(null);
      setPassword("");
      setRePassword("");
    } catch (error) {
      setSuccess("");
      setError(error.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputField = (type, value, id, label, setter) => (
    <input
      className="rounded-xl border-[1px] border-slate-700 pl-4 pr-8 py-2"
      type={type}
      value={value ?? ""}
      name={id}
      id={id}
      placeholder={label}
      onChange={setter}
      required
    />
  );

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

  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400">
          <section className="md:bg-blue-600 md:max-w-[90vw] mx-auto h-max p-6 sm:p-10 rounded-lg">
            <div className="w-full rounded-xl bg-white px-6 py-5">
              <form
                className="w-full mx-auto flex flex-col"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <p className="font-semibold text-xl text-center mb-5">
                  DAFTAR SEBAGAI PEDAGANG UMKM
                </p>
                <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mx-auto">
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
                    <select
                      className="rounded-xl border-[1px] border-slate-700 pl-4 pr-8 py-2 text-gray-600"
                      name="alamatusaha"
                      id="alamatusaha"
                      defaultValue={alamatusaha}
                      onChange={(e) => setAlamatusaha(e.target.value)}
                    >
                      <option value="" disabled>
                        Pilih Alamat Usaha
                      </option>
                      <option value="Kedungkandang">Kedungkandang</option>
                      <option value="Klojen">Klojen</option>
                      <option value="Blimbing">Blimbing</option>
                      <option value="Lowokwaru">Lowokwaru</option>
                      <option value="Sukun">Sukun</option>
                    </select>
                    <div className="rounded-xl border-[1px] border-slate-700 px-4 py-2 w-full">
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
                  className={`rounded-xl text-xl w-full sm:w-[50%] mx-auto mt-6 mb-5 bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out ${
                    isLoading ? "bg-violet-400 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
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
                {error && (
                  <ErrorAlert error={error} func={() => setError(false)} />
                )}
                {success && (
                  <SuccessAlert
                    success={success}
                    func={() => setSuccess(false)}
                  />
                )}
              </form>
              <p className="w-full text-center mt-5">
                Sudah Punya Akun?{" "}
                <span className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out">
                  <Link to={"/login"}>Login</Link>
                </span>
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}