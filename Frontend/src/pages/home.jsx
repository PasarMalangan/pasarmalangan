import Footer from "../components/containers/footer/footer";
import Navbar from "../components/containers/navbar/navbar";
import image from "../image";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <article className="relative w-full h-full bg-blue-600 pt-20 mb-32">
          <section className="grid grid-cols-2 items-center gap-5">
            <div className="bg-sky-400 h-max py-5 pl-5 pr-20 rounded-tr-[200px] rounded-br-[200px]">
              <h1 className="text-slate-100 font-bold text-3xl">
                Dukung dan Temukan UMKM Terbaik di Malang,
              </h1>
              <h4 className="text-slate-100 text-xl mt-5">
                Platform Terpadu untuk Menghubungkan Anda dengan Pelaku Usaha
                Mikro, Kecil, dan Menengah di Kota Malang. Jelajahi Produk
                Lokal, Layanan Unik, dan Berbagai Kesempatan Kolaborasi.
              </h4>
              <div className="flex justify-between my-5 pr-10">
                <a
                  className="rounded-2xl border-[1.5px] shadow-2xl px-5 py-3 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
                  href=""
                >
                  JELAJAHI UMKM
                </a>
                <a
                  className="rounded-2xl border-[1.5px] shadow-2xl px-5 py-3 border-black bg-violet-500 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 ease-out"
                  href=""
                >
                  DAFTARKAN BISNIS
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 items-end px-5 gap-5">
              <img className="w-full" src={image.hero_1} alt="" />
              <img className="w-full" src={image.hero_2} alt="" />
            </div>
          </section>
          <section className="translate-y-1/2 w-[80%] h-max mx-auto bg-white flex justify-around items-center py-2 rounded-3xl shadow-2xl">
            <div className="w-24">
              <img src={image.icon_marketplace_home} alt="" />
              <h6 className="text-center font-medium">Marketplace</h6>
            </div>
            <div className="w-24">
              <img src={image.icon_business_home} alt="" />
              <h6 className="text-center font-medium">Profil Bisnis</h6>
            </div>
            <div className="w-24">
              <img src={image.icon_community_home} alt="" />
              <h6 className="text-center font-medium">Komunitas</h6>
            </div>
            <div className="w-24">
              <img src={image.icon_training_home} alt="" />
              <h6 className="text-center font-medium">Pelatihan UMKM</h6>
            </div>
          </section>
        </article>
        
        <article>
          <h1 className="text-center font-bold text-3xl">APA ITU PASAR MALANGAN?</h1>
        </article>
      </main>
      <Footer />
    </>
  );
}
