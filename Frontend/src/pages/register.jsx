import { Link } from "react-router-dom";
import NavAuth from "../components/containers/navbar/navbarAuth";
import Footer from "../components/containers/footer/footer";
import image from "../image";
export default function Register() {
  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 md:flex items-center justify-center">
          <section className="md:bg-blue-600 md:w-max h-max md:p-10 p-5 mx-auto">
            <div className="md:grid grid-cols-2 gap-6">
              <img
                className="hidden md:block w-full"
                src={image.logo_auth}
                alt="logoauth"
              />
              <div className="relative w-full h-full m-auto bg-white px-6 py-10 md:py-5 rounded-2xl">
                <h2 className="font-semibold text-2xl mb-7">
                  Daftar Sebagai?
                </h2>
                <section className="flex flex-col gap-10">
                  <Link
                    className="flex items-center bg-gray-200 rounded-xl shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
                    to={"/register/pembeli"}
                  >
                    <img className="md:w-[25%]" src={image.icon_bag} alt="" />
                    <h5 className="md:text-2xl">Pembeli</h5>
                  </Link>
                  <Link
                    className="flex items-center bg-gray-200 rounded-xl shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
                    to={"/register/pedagang"}
                  >
                    <img className="md:w-[25%]" src={image.icon_shop} alt="" />
                    <h5 className="md:text-2xl">Pedagang UMKM</h5>
                  </Link>
                  <div className="text-lg md:text-xl translate-y-full text-center text-gray-600">
                    Sudah Punya Akun?{" "}
                    <span className="text-red-500 font-semibold hover:text-red-700 transition-colors duration-300 ease-in-out">
                      <Link to={"/login"}> Login</Link>
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
