import Footer from "../components/elements/footer/footer";
import NavAuth from "../components/elements/navbar/navbarAuth";
import image from "../image";
export default function Login() {
  return (
    <>
    <NavAuth typeform="LOG IN"/>
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-max h-max p-10">
            <div className="flex justify-center gap-10">
              <img className="w-1/2" src={image.logo_auth} alt="logoauth" />
              <div className="relative w-1/2 bg-white px-9 py-5">
                <form className="flex flex-col gap-8 mb-5" action="">
                  <p className="font-bold text-xl">LOG IN</p>
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="email"
                    name=""
                    id=""
                    placeholder="Masukkan Email Anda"
                    required
                  />
                  <input
                    className="border-[1px] border-slate-700 px-4 py-2"
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out"
                  >
                    LOG IN
                  </button>
                </form>
                <a
                  className="text-violet-500 hover:text-violet-700 transition-colors duration-300 ease-in-out"
                  href=""
                >
                  Lupa Password?
                </a>
                <p className="translate-y-full bottom-5 w-full text-center">
                  Belum Punya Akun?{" "}
                  <span className="text-red-500 hover:text-red-700 transition-colors duration-500 ease-in-out">
                    <a href="">Daftar</a>
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
