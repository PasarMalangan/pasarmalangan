import { Link, useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import { useState } from "react";

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//logo
import TokopediaLogo from "../../public/marketplace/logo/tokopedia.svg";
import ShopeeLogo from "../../public/marketplace/logo/Shopee.svg";

const products = [
  {
    id: "63ea1d8e4a0840d3b6c10421",
    owner_id: "63e9dbf84a0840d3b6c10413",
    namausaha: "Toko Elektronik Sejahtera",
    name: "Smartphone XYZ 2024",
    description:
      "Smartphone canggih dengan kamera 108MP dan baterai tahan lama.",
    harga: 5000000,
    images: [
      "https://via.placeholder.com/300x200?text=Produk+1",
      "https://via.placeholder.com/300x200?text=Produk+1+Detail",
    ],
    category: "digital",
    linkecommerences: [
      "https://shopee.com/smartphone-xyz-2024",
      "https://tokopedia.com/smartphone-xyz-2024",
      "https://market.com/smartphone-xyz-2024",
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
      "https://via.placeholder.com/300x200?text=Produk+2+Detail",
    ],
    category: "kuliner",
    linkecommerences: [
      "https://kedai-kopi.com/kopi-arabika-premium",
      "https://ecommerce.com/kopi-arabika-premium",
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
      "https://via.placeholder.com/300x200?text=Produk+3+Detail",
    ],
    category: "fashion",
    linkecommerences: [
      "https://tokofashion.com/jaket-kulit-premium",
      "https://fashionstore.com/jaket-kulit-premium",
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
      "https://via.placeholder.com/300x200?text=Produk+4+Detail",
    ],
    category: "kerajinan",
    linkecommerences: [
      "https://tokomebel.com/meja-jati-solid",
      "https://furnitureshop.com/meja-jati-solid",
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
      "https://via.placeholder.com/300x200?text=Produk+5+Detail",
    ],
    category: "digital",
    linkecommerences: [
      "https://tokobuku.com/buku-panduan-pemrograman",
      "https://ecommercebooks.com/buku-panduan-pemrograman",
    ],
    isApproved: "disetujui",
    click: 120,
    location: "sukun",
  },
];

const getEcommerceLogo = (link) => {
  if (link.includes("tokopedia")) {
    return (
      <img
        src={TokopediaLogo}
        alt="Tokopedia"
        className="h-10 w-30 object-contain"
      />
    );
  }
  if (link.includes("shopee")) {
    return (
      <img src={ShopeeLogo} alt="Shopee" className="h-10 w-30 object-contain" />
    );
  } else {
    return (
      <Link
        to={`${link}`}
        className="inline-block p-2 bg-blue-500 text-white px-6 rounded-lg"
      >
        Marketplace
      </Link>
    );
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
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
  <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
    <div className="flex flex-col md:flex-row items-start">
      {/* Gambar Produk */}
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
      {/* Detail Produk */}
      <div className="flex-1 md:pl-6 mt-4 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
        {clicked && (
          <p className="mt-2 text-green-700 font-semibold text-sm">
            Produk telah ditambahkan ke wishlist Anda!
          </p>
        )}
        <p className="text-lg font-semibold text-gray-600 mb-2">
          Rp {product.harga.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Dijual oleh: <span className="font-medium">{product.namausaha}</span>
        </p>
        <p className="text-sm text-black mb-4">
          Kategori: <span className="font-medium">{product.category}</span>
        </p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <div className="space-y-3">
          <button
            onClick={handleClick}
            className={`w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-2 ${
              clicked ? "bg-green-500" : ""
            }`}
          >
            {clicked ? "Tunggu Sebentar" : "Tambahkan ke Wishlist"}
          </button>
          <Link
            to={`/tokodetail/${product.owner_id}`}
            className="w-full md:w-auto inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors m-2"
          >
            Profil Toko
          </Link>
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h5 className="text-lg font-bold mb-4">Link Marketplace</h5>
          <div className="space-y-3">
            {product.linkecommerences.map((link, index) => (
              <Link
                key={index}
                to={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow hover:scale-105 hover:shadow-lg transition-transform duration-100 w-fit"
              >
                {getEcommerceLogo(link)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-10">
    <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
    <section id="related-products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedProducts.map((relatedProduct) => (
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
            <p className="text-gray-600">Rp {relatedProduct.harga.toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </section>
  </div>
</div>

    </>
  );
}
