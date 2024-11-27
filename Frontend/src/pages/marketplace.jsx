import image from "../image";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
export default function Marketplace() {
  return (
    <>
      <Navbar />
      <main className="w-full h-max bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 py-10 px-40">
        <div className="relative flex items-center mx-auto w-[60vw] pb-10">
          <img className="absolute left-[10%]" src={image.icon_search} alt="" />
          <input
            className="w-full rounded-full px-28 py-1 placeholder:text-center placeholder:font-semibold text-lg text-center "
            type="text"
            placeholder="Cari Produk UMKM Malang"
          />
        </div>
        <div>
          <ul className="flex justify-center gap-10">
            <li className="bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
              Kuliner
            </li>
            <li className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
              Fashion
            </li>
            <li className="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
              Pertanian
            </li>
            <li className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
              Kerajinan
            </li>
            <li className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 ease-in-out text-white font-medium px-10 py-2 rounded-lg cursor-pointer">
              Digital
            </li>
          </ul>
        </div>
        <img
          className="mx-auto w-[70vw] py-10"
          src={image.ads_example}
          alt="ads"
        />
        <article className="">
          <h4 className="text-2xl font-bold">Rekomendasi</h4>
          <section className="grid grid-cols-4 gap-5 mt-10">
            {/* cards products */}
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-lg shadow-xl">
              <img src="/marketplace/baju.png" alt="productimg" />
              <div className="px-3 py-5 text-white font-medium">
                <p className="mb-10">Batik Sutra ATM Prada</p>
                <div className="flex justify-between">
                  <p>Rp. 90.000</p>
                  <div className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 ease-in-out text-white font-medium px-3 py-[2px] rounded-md cursor-pointer">
                    Fashion
                  </div>
                </div>
              </div>
            </div>
            {/* end cards products */}
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
