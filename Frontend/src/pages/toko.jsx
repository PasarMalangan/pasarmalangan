import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import { useState } from "react";



const products = [
  {
    id: "63ea1d8e4a0840d3b6c10421",
    owner_id: "63e9dbf84a0840d3b6c10413",
    namausaha: "Toko Elektronik Sejahtera",
    name: "Smartphone XYZ 2024",
    description: "Smartphone canggih dengan kamera 108MP dan baterai tahan lama.",
    harga: 5000000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Detail"
    ],
    category: "digital",
    linkecommerences: [
      "https://tokoonline.com/smartphone-xyz-2024",
      "https://marketplace.com/smartphone-xyz-2024"
    ],
    isApproved: "pending",
    click: 150,
    location: "klojen",
  },
  {
    id: "63ea1d8e4a0840d3b6c10422",
    owner_id: "63e9dbf84a0840d3b6c10413",
    namausaha: "Kedai Kopi Nusantara",
    name: "Kopi Arabika Premium",
    description: "Kopi Arabika dengan rasa kaya dan aroma yang menggoda.",
    harga: 75000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+2",
      "https://via.placeholder.com/300x200?text=Produk+2+Detail"
    ],
    category: "kuliner",
    linkecommerences: [
      "https://kedai-kopi.com/kopi-arabika-premium",
      "https://ecommerce.com/kopi-arabika-premium"
    ],
    isApproved: "disetujui",
    click: 250,
    location: "blimbing",
  },
  {
    id: "63ea1d8e4a0840d3b6c10423",
    owner_id: "63e9dbf84a0840d3b6c10415",
    namausaha: "Toko Fashion Trendi",
    name: "Jaket Kulit Premium",
    description: "Jaket kulit asli dengan desain modern dan kualitas premium.",
    harga: 1200000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+3",
      "https://via.placeholder.com/300x200?text=Produk+3+Detail"
    ],
    category: "fashion",
    linkecommerences: [
      "https://tokofashion.com/jaket-kulit-premium",
      "https://fashionstore.com/jaket-kulit-premium"
    ],
    isApproved: "ditolak",
    click: 80,
    location: "kedungkandang",
  },
  {
    id: "63ea1d8e4a0840d3b6c10424",
    owner_id: "63e9dbf84a0840d3b6c10415",
    namausaha: "Mebel Jati Lestari",
    name: "Meja Jati Solid",
    description: "Meja dari kayu jati asli yang tahan lama dan elegan.",
    harga: 3000000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+4",
      "https://via.placeholder.com/300x200?text=Produk+4+Detail"
    ],
    category: "kerajinan",
    linkecommerences: [
      "https://tokomebel.com/meja-jati-solid",
      "https://furnitureshop.com/meja-jati-solid"
    ],
    isApproved: "pending",
    click: 95,
    location: "lowokwaru",
  },
  {
    id: "63ea1d8e4a0840d3b6c10425",
    owner_id: "63e9dbf84a0840d3b6c10413",
    namausaha: "Toko Buku Pelangi",
    name: "Buku Panduan Belajar Pemrograman",
    description: "Panduan lengkap untuk pemula yang ingin belajar pemrograman.",
    harga: 150000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+5",
      "https://via.placeholder.com/300x200?text=Produk+5+Detail"
    ],
    category: "digital",
    linkecommerences: [
      "https://tokobuku.com/buku-panduan-pemrograman",
      "https://ecommercebooks.com/buku-panduan-pemrograman"
    ],
    isApproved: "disetujui",
    click: 120,
    location: "sukun",
  }
];


// Dummy database
const pedagang = [
  {
    id: "63e9dbf84a0840d3b6c10415",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    notelepon: "081234567890",
    password: "password123",
    role: "pedagang",
    namausaha: "Toko Elektronik Sejahtera",
    alamatusaha: "Jl. Merdeka No. 123, Jakarta",
    category: "Elektronik",
    description: "Menjual berbagai macam perangkat elektronik",
    identitaspedagang: "KTP1234567890",
    linkecommerences: "https://tokopedia.com/tokofauzi",
    profilepict: "https://example.com/profile1.jpg",
    isApproved: true,
  },
  {
    id: "63e9dbf84a0840d3b6c10413",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    notelepon: "081234567891",
    password: "password123",
    role: "pedagang",
    namausaha: "Mebel Jati Lestari",
    alamatusaha: "Jl. Sudirman No. 45, Bandung",
    category: "Fashion",
    description: "Menjual pakaian dan aksesoris terkini",
    identitaspedagang: "KTP9876543210",
    linkecommerences: "https://shopee.com/tokonurhaliza",
    profilepict: "https://example.com/profile2.jpg",
    isApproved: true,
  },
];



export default function ShopDetail() {
  // const { owner_id } = useParams();
  // const shop = pedagang.find((p) => p.id === owner_id);
  // const shopProducts = products.filter((product) => product.owner_id === shop.id);

  const { owner_id } = useParams();

  // Cari data pedagang berdasarkan owner_id
  const shopOwner = pedagang.find((p) => p.id === owner_id);

  // Filter produk berdasarkan owner_id
  const shopProducts = products.filter((p) => p.owner_id === owner_id);

  if (!shopProducts) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-start">
            {/* Gambar toko */}
            <div className="w-full md:w-1/2">
              <img
                src={
                  shopOwner.profilepict
                    ? shopOwner.profilepict
                    : "https://via.placeholder.com/150?text=No+Image"
                }
                alt={shopOwner.namausaha}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Detail toko */}
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-2 text-blue-700">
                {shopOwner.namausaha}
              </h1>
              <p className="text-gray-600 mb-4">
                {shopOwner.description || "Belum ada deskripsi toko."}
              </p>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Informasi Toko:
                </h2>
                <p className="text-gray-600">Alamat: {shopOwner.alamatusaha}</p>
                <p className="text-gray-600">
                  Kategori: {shopOwner.category || "Tidak tersedia"}
                </p>
                <p className="text-gray-600">Kontak: {shopOwner.notelepon}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  E-commerce Link:
                </h2>
                {shopOwner.linkecommerences ? (
                  <a
                    href={shopOwner.linkecommerences}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Kunjungi Halaman E-commerce
                  </a>
                ) : (
                  <p className="text-gray-600">Tidak tersedia</p>
                )}
              </div>
              <Link
                to={`https://wa.me/${shopOwner.notelepon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Hubungi Penjual
              </Link>
            </div>
          </div>
        </div>
        <br />
        <h4 className="px-5 text-2xl font-bold text-center">Produk Dari Toko</h4>
          <br />
          <section id="unggulan">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {shopProducts.map((product) => (
                <Link
                  to={"/produkdetail/" + product.id}
                  rel="noopener noreferrer"
                  key={product.id}
                  className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-100 transform hover:scale-105"
                >
                  <div className="w-full aspect-w-4 aspect-h-3">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h5>
                    <p className="mt-2 text-gray-700 text-sm">
                      {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
      </div>
      
    </>
  );
}
