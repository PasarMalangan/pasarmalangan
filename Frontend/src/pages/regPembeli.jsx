import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
import image from "../image";
import { useState } from "react";
import { registerUserPembeli } from "../../services/auth";
export default function RegPembeli() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const role = "pembeli";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi konfirmasi password
    if (password !== rePassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 8) {
      setError("Password harus terdiri dari minimal 8 karakter!");
      return;
    }

    setIsLoading(true);
    try {
      // Panggil fungsi registerUser dari services/auth.js
      const responseData = await registerUserPembeli({
        email,
        username,
        password,
        role,
      });
      setSuccess(responseData.message);
      setError("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRePassword("");
      // Tambahkan logika redirect atau notifikasi sukses di sini
    } catch (error) {
      setSuccess("");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-max h-max p-10">
            <div className="grid grid-cols-2 justify-center gap-10">
              <img className="" src={image.logo_auth} alt="logoauth" />
              <div className="relative bg-white px-9 py-5 rounded-2xl">
                <form
                  className="flex flex-col gap-8 mb-5"
                  onSubmit={handleSubmit}
                >
                  <p className="font-semibold text-xl">
                    DAFTAR SEBAGAI PEMBELI
                  </p>
                  {error && <div className="text-red-500">{error}</div>}
                  {success && <div className="text-green-500">{success}</div>}
                  <input
                    className="rounded-xl border-[1px] border-slate-700 px-4 py-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="rounded-xl border-[1px] border-slate-700 px-4 py-2"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Masukkan Username Baru Anda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    className="rounded-xl border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password Baru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="rounded-xl border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    id="repassword"
                    placeholder="Konfirmasi Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className={`rounded-xl text-xl bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out ${
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
                <div className="w-full text-center">
                  Sudah Punya Akun?{" "}
                  <span className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out">
                    <Link to={"/login"}>Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
