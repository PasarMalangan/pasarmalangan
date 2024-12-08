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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    setIsLoading(true);
    try {
      const response = await loginUser(userData);
      const { token } = response;

      localStorage.setItem("token", token);

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const role = decodedToken.role; // Ambil role dari token

      localStorage.setItem("role", role);

      if (role === "pembeli") {
        navigate(`/dashboard/${role}`);
      }
      if (role === "pedagang") {
        navigate(`/pengaturan/${role}`);
      }
      if (role === "superadmin") {
        navigate(`/dashboard/${role}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
                    disabled={isLoading}
                    className={`rounded-xl text-xl bg-violet-500 text-white font-semibold py-2 
    ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-violet-700"} 
    transition-colors duration-300 ease-out`}
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
                      "LOG IN"
                    )}
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
