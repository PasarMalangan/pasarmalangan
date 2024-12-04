import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import NavAuth from "../components/containers/navbar/navbarAuth";
import { useState } from "react";
import { registerUser } from "../../services/auth";

export default function RegPedagang() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [namausaha, setNamausaha] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [notelepon, setNotelepon] = useState("");
  const [alamatusaha, setAlamatusaha] = useState("");
  const [identitaspedagang, setIdentitaspedaganag] = useState("");
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
      const responseData = await registerUser({
        email,
        namausaha,
        owner,
        notelepon,
        alamatusaha,
        identitaspedagang,
        password,
        role,
      });
      setSuccess(responseData.message);
      setError("");
      setNamausaha("");
      setOwner("");
      setEmail("");
      setNotelepon("");
      setAlamatusaha("");
      setIdentitaspedaganag("");
      setPassword("");
      setRePassword("");
      // Tambahkan logika redirect atau notifikasi sukses di sini
    } catch (error) {
      setSuccess("");
      setError(error.message);
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
                <form className="w-full mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
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
                        owner,
                        "owner",
                        "Nama Pemilik Usaha",
                        (e) => setOwner(e.target.value)
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
                      <div className="relative border-[1px] border-slate-700 pl-4 pr-8 py-2">
                        <label
                          className="text-gray-500 cursor-pointer w-full"
                          htmlFor="identitaspedagang"
                        >
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
