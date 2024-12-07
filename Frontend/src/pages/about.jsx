import Navbar from "../components/containers/navbar/navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-500 text-white min-h-screen flex flex-col items-center">
        <header className="w-full py-6 bg-blue-700 shadow-md">
          <h1 className="text-center text-3xl font-bold">Tentang Kami</h1>
        </header>

        <main className="flex flex-col items-center w-10/12 max-w-screen-lg mt-8 space-y-8 mb-8">
          <section className="bg-white text-blue-800 rounded-lg shadow-md p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Visi Kami</h2>
            <p className="text-lg leading-relaxed">
              Kami adalah platform yang bertujuan untuk mendukung dan
              mempromosikan pelaku UMKM terbaik di Malang. Dengan menghubungkan
              pelaku usaha dengan masyarakat, kami ingin menciptakan peluang
              kolaborasi dan pertumbuhan ekonomi lokal.
            </p>
          </section>

          <section className="bg-white text-blue-800 rounded-lg shadow-md p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Misi Kami</h2>
            <ul className="list-disc pl-6 text-lg space-y-2">
              <li>
                Memberikan akses mudah kepada UMKM untuk menampilkan produk dan
                layanan mereka.
              </li>
              <li>
                Menyediakan platform interaktif untuk menjembatani pelaku usaha
                dengan masyarakat.
              </li>
              <li>Mendorong pertumbuhan ekonomi lokal melalui kolaborasi.</li>
            </ul>
          </section>

          <section className="bg-white text-blue-800 rounded-lg shadow-md p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">Inovasi</h3>
                <p>
                  Kami terus berinovasi untuk memberikan layanan terbaik kepada
                  UMKM dan pengguna.
                </p>
              </div>
              <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl ">Komitmen</h3>
                <p>
                  Kami berkomitmen untuk mendukung keberlanjutan usaha mikro,
                  kecil, dan menengah.
                </p>
              </div>
              <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">Kolaborasi</h3>
                <p>
                  Bersama komunitas dan mitra, kami membangun ekosistem yang
                  saling mendukung.
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white text-blue-800 rounded-lg shadow-md p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Tim Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="https://via.placeholder.com/300x200"
                  alt="Card Image"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">Nama</h5>
                  <p className="mt-2 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus unde neque quaerat maiores quas libero odio.
                    Praesentium, magni ducimus qui odit excepturi, dolores
                    dignissimos ipsa exercitationem deserunt voluptatum
                    accusantium pariatur.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full py-4 bg-blue-700 mt-auto text-center">
          <p>&copy; 2024 Pasar Malangan. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
