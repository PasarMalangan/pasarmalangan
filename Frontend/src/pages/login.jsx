import { Link, useNavigate } from "react-router-dom";
import NavAuth from "../components/containers/navbar/navbarAuth";
import Footer from "../components/containers/footer/footer";
import image from "../image";
import { loginUser } from "../../services/auth";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await loginUser(userData);
      const { token } = response;

      // Simpan token di localStorage
      localStorage.setItem("token", token);

      // Mendekode token dan mendapatkan role
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const role = decodedToken.role; // Ambil role dari token

      // Simpan role di localStorage
      localStorage.setItem("role", role);

      // Redirect berdasarkan role
      if (role === "pembeli") {
        navigate(`/dashboard/${role}`); // Redirect ke halaman dashboard jika role = pembeli
      }
      if (role === "pedagang") {
        navigate(`/dashboard/${role}`); // Redirect ke halaman utama pedagang
      }
      if (role === "superadmin") {
        navigate(`/dashboard/${role}`); // Redirect ke halaman utama superadmin
      }

      console.log(response); // Menampilkan response untuk debug
    } catch (err) {
      setError(err.message); // Menampilkan error jika login gagal
    }
  };

  return (
    <>
      <NavAuth typeform="LOG IN" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-max h-max p-10">
            <div className="flex justify-center gap-10">
              <img className="w-1/2" src={image.logo_auth} alt="logoauth" />
              <div className="relative w-1/2 bg-white px-9 py-5 rounded-2xl">
                <form
                  className="flex flex-col gap-8 mb-5"
                  onSubmit={handleSubmit}
                >
                  <p className="font-bold text-xl">LOG IN</p>
                  {error && <p className="text-red-500">{error}</p>}
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email Anda"
                    required
                  />
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-xl text-xl bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out"
                  >
                    LOG IN
                  </button>
                </form>
                <Link
                  className="text-violet-500 hover:text-violet-700 transition-colors duration-300 ease-in-out"
                  to={""}
                >
                  Lupa Password?
                </Link>
                <p className="translate-y-full bottom-5 w-full text-center">
                  Belum Punya Akun?{" "}
                  <span className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out">
                    <Link to={"/register"}>Daftar</Link>
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