import { Link } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import Navbar from "../components/containers/navbar/navbar";
import image from "../image";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <article className="relative w-full h-full bg-blue-300 pt-20 mb-20 md:mb-10">
          <section className="grid md:grid-cols-2 items-center gap-5 md:pr-2">
            <div className="bg-sky-400 h-max py-5 pl-5 pr-10 md:pr-20 md:rounded-tr-[200px] md:rounded-br-[200px]">
              <h1 className="text-slate-100 font-bold text-3xl">
                Dukung dan Temukan UMKM Terbaik di Malang,
              </h1>
              <h4 className="text-slate-100 text-lg md:text-xl mt-5">
                Platform Terpadu untuk Menghubungkan Anda dengan Pelaku Usaha
                Mikro, Kecil, dan Menengah di Kota Malang. Jelajahi Produk
                Lokal, Layanan Unik, dan Berbagai Kesempatan Kolaborasi.
              </h4>
              <div className="flex justify-around gap mt-8">
                <Link
                  className="text-sm md:text-base rounded-2xl border-[1.5px] shadow-lg px-5 py-3 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
                  to="/marketplace"
                >
                  JELAJAHI UMKM
                </Link>
                <Link
                  className="text-sm md:text-base rounded-2xl border-[1.5px] shadow-lg px-5 py-3 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
                  to="/register/pedagang"
                >
                  DAFTARKAN BISNIS
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 items-end gap-5">
              <img
                className="w-full rounded-lg"
                src={image.hero_1}
                alt="icnhero1"
              />
              <img
                className="w-full rounded-lg"
                src={image.hero_2}
                alt="icnhero2"
              />
            </div>
          </section>
          <section className="translate-y-1/2 w-[90%] md:w-[80%] mx-auto bg-white grid grid-cols-2 md:flex justify-around items-center py-5 rounded-3xl shadow-2xl">
            {[
              { icon: image.icon_marketplace_home, label: "Marketplace" },
              { icon: image.icon_business_home, label: "Profil Bisnis" },
              { icon: image.icon_community_home, label: "Komunitas" },
              { icon: image.icon_training_home, label: "Pelatihan UMKM" },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <img
                  className="w-16 h-16 mx-auto"
                  src={feature.icon}
                  alt={feature.label}
                />
                <h6 className="font-medium mt-2">{feature.label}</h6>
              </div>
            ))}
          </section>
        </article>

        {/* About Section */}
        <article className="md:grid grid-cols-2 items-center gap py-20 px-5 bg-gray-50 text-gray-800">
          <section>
            <h1 className="text-center font-bold text-3xl mb-10">
              APA ITU PASAR MALANGAN?
            </h1>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg leading-relaxed">
                Pasar Malangan adalah platform inovatif yang bertujuan untuk
                mempromosikan dan mendukung UMKM di Kota Malang. Kami
                menyediakan ruang untuk para pelaku usaha memamerkan produk
                mereka, menjalin kolaborasi, dan memperluas jaringan mereka.
              </p>
            </div>
          </section>
          <img className="mx-auto" src="/home/introweb.png" alt="introweb" />
        </article>

        {/* Features Section */}
        <section className="py-20 bg-white px-5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Fitur Unggulan Kami</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  image: "/home/feature1.png",
                  title: "Eksplorasi Mudah",
                  description:
                    "Temukan produk UMKM terbaik dengan mudah melalui marketplace kami.",
                },
                {
                  image: "/home/feature2.png",
                  title: "Dukungan Komunitas",
                  description:
                    "Bergabung dengan komunitas pelaku usaha untuk saling berbagi ilmu.",
                },
                {
                  image: "/home/feature3.png",
                  title: "Pelatihan UMKM",
                  description:
                    "Ikuti pelatihan yang dirancang untuk meningkatkan kemampuan bisnis Anda.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="shadow-lg p-5 rounded-lg bg-gray-100"
                >
                  <img
                    className="w-40 h-40 mx-auto"
                    src={feature.image}
                    alt=""
                  />
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cara Praktis Memasarkan Produk UMKM Anda */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Cara Praktis Memasarkan Produk UMKM Anda
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40  flex items-center justify-center">
                  <img
                    src="/home/step1.png"
                    alt="Step 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  1. Daftar Sebagai Pedagang UMKM
                </h3>
                <p className="text-gray-600">
                  Buat akun pedagang dengan mengisi informasi dasar bisnis Anda.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40  flex items-center justify-center">
                  <img
                    src="/home/step2.png"
                    alt="Step 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  2. Verifikasi Identitas
                </h3>
                <p className="text-gray-600">
                  Pastikan Anda adalah warga Malang dengan langkah verifikasi
                  mudah.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40  flex items-center justify-center">
                  <img
                    src="/home/step3.png"
                    alt="Step 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">3. Tambahkan Produk</h3>
                <p className="text-gray-600">
                  Masuk ke dashboard dan tambahkan produk Anda dari e-commerce
                  lain.
                </p>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40  flex items-center justify-center">
                  <img
                    src="/home/step4.png"
                    alt="Step 4"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">4. Tunggu Persetujuan</h3>
                <p className="text-gray-600">
                  Produk Anda akan dipasarkan setelah disetujui oleh tim kami.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}