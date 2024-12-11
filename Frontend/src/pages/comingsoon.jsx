import Footer from "../components/containers/footer/footer";
import Navbar from "../components/containers/navbar/navbar";

export default function Comingsoon() {
  return (
    <main class="bg-gray-200 font-sans leading-normal tracking-normal">
      <Navbar />
      <section class="bg-white py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center">
            <h1 class="text-4xl font-bold mb-6">We're launching soon</h1>
            <p class="text-gray-600 mb-12">
              Masukkan email Anda untuk menjadi orang pertama yang mengetahui
              kapan kami meluncurkannya.
            </p>
            <form class="max-w-md mx-auto">
              <div class="flex items-center">
                <input
                  type="email"
                  class="bg-gray-100 mr-3 py-2 px-4 w-full rounded-md focus:outline-none focus:bg-white"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  class="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section class="bg-gray-200 py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-6">
              Layanan Baru Akan Segera Hadir!
            </h2>
            <p class="text-gray-600 mb-12">
              Kami sedang mempersiapkan layanan baru yang akan memberikan
              pengalaman terbaik untuk Anda. Tim kami bekerja keras untuk
              memastikan setiap detailnya. Nantikan segera peluncuran layanan
              ini, dan terima kasih atas kesabaran Anda.
            </p>
          </div>
          <div class="flex flex-wrap justify-around -mx-4 mt-12">
            <div class="w-full md:w-1/3 px-4 mb-8">
              <div class="rounded-md bg-white shadow-md p-8">
                <div class="text-4xl font-bold text-purple-600 mb-4">01</div>
                <img className="h-72 mx-auto w-auto" src="/comingsoon/communitycm.jpg" alt="" />
                <h3 class="text-2xl font-bold mb-4">Komunitas</h3>
                <p class="text-gray-600 mb-4">
                  Layanan Komunitas Pedagang UMKM kami bertujuan untuk
                  menciptakan ekosistem yang saling mendukung dan memberi
                  manfaat nyata. Dalam komunitas ini, Anda tidak hanya
                  mendapatkan akses ke informasi dan pelatihan, tetapi juga
                  kesempatan untuk berkolaborasi, berbagi pengalaman, dan
                  memperluas jaringan usaha.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-4 mb-8">
              <div class="rounded-md bg-white shadow-md p-8">
                <div class="text-4xl font-bold text-purple-600 mb-4">02</div>
                <img className="h-72 mx-auto w-auto" src="/comingsoon/learningcm.jpg" alt="" />
                <h3 class="text-2xl font-bold mb-4">Pelatihan UMKM</h3>
                <p class="text-gray-600 mb-4">
                  Layanan Pelatihan UMKM kami menawarkan berbagai program yang
                  dapat membantu Anda meningkatkan efisiensi operasional,
                  memperluas pasar, dan meningkatkan kualitas produk atau
                  layanan. Dengan mengikuti pelatihan kami, Anda akan
                  mendapatkan wawasan yang lebih mendalam tentang berbagai aspek
                  bisnis, mulai dari pemasaran digital, manajemen keuangan,
                  hingga strategi pengembangan produk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
