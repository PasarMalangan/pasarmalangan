import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
export default function RegPedagang() {
  return (
    <>
      <NavAuth typeform="DAFTAR" />
      <main className="w-full h-full">
        <article className="w-full h-full bg-blue-400 flex items-center justify-center">
          <section className="bg-blue-600 w-[90%] h-max p-10">
            <div className="flex w-full justify-center">
              <div className="w-full bg-white px-9 py-5">
                <form className="w-full mx-auto" action="">
                  <p className="font-semibold text-xl text-center mb-5">
                    DAFTAR SEBAGAI PEDAGANG UMKM
                  </p>
                  <section className="w-full grid grid-cols-2 gap-10 mx-auto">
                    <div className="flex flex-col gap-5">
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="text"
                        name=""
                        id=""
                        placeholder="Nama Usaha"
                        required
                      />
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="text"
                        name=""
                        id=""
                        placeholder="Nama Pemilik"
                        required
                      />
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="email"
                        name=""
                        id=""
                        placeholder="Alamat Email"
                        required
                      />
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="tel"
                        name=""
                        id=""
                        placeholder="Nomor Telepon"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="text"
                        name=""
                        id=""
                        placeholder="Alamat Usaha"
                        required
                      />
                      <div className="relative border-[1px] border-slate-700 pl-4 pr-8 py-2">
                        <label className="text-gray-500 cursor-pointer w-full" htmlFor="identitaspedagang">
                          Unggah KTP
                        </label>
                        <input
                          className="absolute translate-x-1/2 "
                          type="file"
                          name="identitaspedagang"
                          id="identitaspedagang"
                          placeholder="Unggah KTP"
                          required
                        />
                      </div>
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="password"
                        name=""
                        id=""
                        placeholder="Masukkan Password Baru"
                        required
                      />
                      <input
                        className="border-[1px] border-slate-700 pl-4 pr-8 py-2"
                        type="tel"
                        name=""
                        id=""
                        placeholder="Konfirmasi Password"
                        required
                      />
                    </div>
                  </section>
                  <button
                    type="submit"
                    className="w-[50%] mx-auto translate-x-1/2 mt-10 mb-5 bg-violet-500 text-white font-semibold py-2 hover:bg-violet-700 transition-colors duration-300 ease-out"
                  >
                    Daftar
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
