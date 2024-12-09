import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import { useState } from "react";

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    shop: "Toko A",
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
    shop: "Toko B",
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
    shop: "Toko A",
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
    shop: "Toko B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Fashion",
    link: "https://example.com/produk1",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    // Reset efek setelah beberapa detik (opsional)
    setTimeout(() => {
      setClicked(false);
    }, 2000); // 2 detik
  };

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6  mx-auto">
          <div className="flex flex-col md:flex-row items-start">
            <div className="w-full md:w-1/2">
              {product.images && product.images.length > 1 ? (
                <Slider {...settings}>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  src={product.images ? product.images[0] : ""}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>{" "}
              <span>
                {clicked && (
                  <p className="mt-2 text-green-700 font-semibold">
                    Produk telah ditambahkan ke wishlist anda !!
                  </p>
                )}
              </span>
              <p className="text-lg font-semibold text-gray-600 mb-2">
                {product.price}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Dijual oleh: <span className="font-medium">{product.shop}</span>
              </p>
              <p className="text-sm text-black mb-4">
                Kategori: <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <button
                onClick={handleClick}
                className={`inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-4 ${
                  clicked ? "bg-green-500" : ""
                }`}
              >
                {clicked ? "Tunggu Sebentar" : "Tambahkan ke Wishlist"}
              </button>
              <Link
              to={`/tokodetail/${product.ownerId}`}
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-4">
                Kunjungi Toko
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <section id="related-products">
            {relatedProducts.map((relatedProduct) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                <Link
                  to={"/produkdetail/" + relatedProduct.id}
                  rel="noopener noreferrer"
                  key={relatedProduct.id}
                  className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600">{relatedProduct.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </section>
          <br />
          <h4 className="px-5 text-2xl font-bold">Semua Produk</h4>
          <br />
          <section id="unggulan">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {products.map((product) => (
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
      </div>
    </>
  );
}
