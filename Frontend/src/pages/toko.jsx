import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import { useState } from "react";



const products = [
  {
    id: 1,
    ownerId: 1,
    name: "Produk 1",
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+2",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+3",
    ],
    price: "Rp 100.000",
    shop: "Toko Fauzi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Kuliner",
    link: "https://example.com/produk1",
  },
  {
    id: 2,
    ownerId: 2,
    name: "Produk 2",
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+2",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+3",
    ],
    price: "Rp 100.000",
    shop: "Toko Nurhaliza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Kuliner",
    link: "https://example.com/produk1",
  },
  {
    id: 3,
    ownerId: 1,
    name: "Produk 3",
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+2",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+3",
    ],
    price: "Rp 100.000",
    shop: "Toko Fauzi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Fashion",
    link: "https://example.com/produk1",
  },
  {
    id: 4,
    ownerId: 3,
    name: "Produk 4",
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+2",
      "https://via.placeholder.com/300x200?text=Produk+1+Gambar+3",
    ],
    price: "Rp 100.000",
    shop: "Toko Nurhaliza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Fashion",
    link: "https://example.com/produk1",
  },
];

// Dummy database
const pedagang = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    notelepon: "081234567890",
    password: "password123",
    role: "pedagang",
    namausaha: "Toko Fauzi",
    alamatusaha: "Jl. Merdeka No. 123, Jakarta",
    category: "Elektronik",
    description: "Menjual berbagai macam perangkat elektronik",
    identitaspedagang: "KTP1234567890",
    linkecommerences: "https://tokopedia.com/tokofauzi",
    profilepict: null,
    isApproved: true,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    notelepon: "081234567891",
    password: "password123",
    role: "pedagang",
    namausaha: "Toko Nurhaliza",
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
  const { id } = useParams();
  const shop = pedagang.find((p) => p.id === parseInt(id));
  const shopProducts = products.filter((product) => product.shop === shop.namausaha);

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
                src={shop.profilepict}
                alt={shop.namausaha}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Detail toko */}
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-2 text-blue-700">
                {shop.namausaha}
              </h1>
              <p className="text-gray-600 mb-4">
                {shop.description || "Belum ada deskripsi toko."}
              </p>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Informasi Toko:
                </h2>
                <p className="text-gray-600">Alamat: {shop.alamatusaha}</p>
                <p className="text-gray-600">
                  Kategori: {shop.category || "Tidak tersedia"}
                </p>
                <p className="text-gray-600">Kontak: {shop.notelepon}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  E-commerce Link:
                </h2>
                {shop.linkecommerences ? (
                  <a
                    href={shop.linkecommerences}
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
                to={`https://wa.me/${shop.notelepon}`}
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
