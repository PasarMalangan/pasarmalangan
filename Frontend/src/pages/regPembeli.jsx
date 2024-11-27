import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
import image from "../image";
import { useState } from "react";
import { registerUser } from "../../services/auth";
export default function RegPembeli() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const role = "pembeli";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi konfirmasi password
    if (password !== rePassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      // Panggil fungsi registerUser dari services/auth.js
      const responseData = await registerUser({
        email,
        username,
        password,
        role,
      });
      setSuccess(responseData.message)
      setError(""); // Reset error jika sukses
      setEmail(""); // Reset email
      setUsername(""); // Reset username
      setPassword(""); // Reset password
      setRePassword(""); // Reset Repassword
      // Tambahkan logika redirect atau notifikasi sukses di sini
    } catch (error) {
      setSuccess("")
      setError(error.message);
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
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Masukkan Username Baru Anda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password Baru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    id="repassword"
                    placeholder="Konfirmasi Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out"
                  >
                    Daftar
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
