import { useParams } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    id: 1,
    name: "Produk 1",
    image: [
    "https://via.placeholder.com/300x200?text=Produk+1+Gambar+1",
    "https://via.placeholder.com/300x200?text=Produk+1+Gambar+2",
    "https://via.placeholder.com/300x200?text=Produk+1+Gambar+3",
  ],
    price: "Rp 100.000",
    shop: "Toko A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dictum enim. Curabitur id magna enim. Donec eu tempus leo, ac vulputate massa. Integer nec luctus augue. Donec ullamcorper, ante eu tincidunt pulvinar, nisi purus condimentum mi, sit amet condimentum nibh lacus eget ex. Ut ac cursus nulla. Nulla in feugiat velit. Morbi suscipit enim at quam euismod egestas. Praesent ut suscipit ipsum. Donec diam lectus, semper id purus ut, scelerisque tincidunt nibh. Ut eros sem, pretium interdum velit ut, tempor gravida lacus. Ut feugiat venenatis odio eget dictum.",
    category: "Kuliner",
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
              {product.images.length > 1 ? (
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
            <div className="flex-1 md:pl-6 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg font-semibold text-gray-600 mb-2">
                {product.price}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Dijual oleh: <span className="font-medium">{product.shop}</span>
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Kunjungi Produk
              </a>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg font-semibold text-gray-600 mb-2">
                {product.price}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Dijual oleh: <span className="font-medium">{product.shop}</span>
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Kunjungi Produk
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
