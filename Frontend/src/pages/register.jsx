import { Link } from "react-router-dom";
import NavAuth from "../components/containers/navbar/navbarAuth";
import Footer from "../components/containers/footer/footer";
import image from "../image";
export default function Register() {
  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-max h-max p-10">
            <div className="flex justify-center gap-10">
              <img className="w-1/2" src={image.logo_auth} alt="logoauth" />
              <div className="w-1/2 bg-white px-9 py-5">
                <h2 className="font-semibold text-xl mb-7">Daftar Sebagai?</h2>
                <section className="flex flex-col gap-10">
                  <Link
                    className="flex items-center bg-gray-200 rounded-xl shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
                    to={"/register/pembeli"}
                  >
                    <img src={image.icon_bag} alt="" />
                    <h5>Pembeli</h5>
                  </Link>
                  <Link
                    className="flex items-center bg-gray-200 rounded-xl shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
                    to={"/register/pedagang"}
                  >
                    <img src={image.icon_shop} alt="" />
                    <h5>Pedagang UMKM</h5>
                  </Link>
                </section>
                <p className="text-lg translate-y-full text-center text-gray-600">
                  Sudah Punya Akun?{" "}
                  <span className="text-red-500 font-semibold hover:text-red-700 transition-colors duration-300 ease-in-out">
                    <Link to={"/login"}> Login</Link>
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
