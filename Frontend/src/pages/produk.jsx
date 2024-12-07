import { useParams } from "react-router-dom";

const products = [
  { id: 1, name: "Produk 1", image: "https://via.placeholder.com/300x200?text=Produk+1", price: "Rp 100.000", shop: "Toko A", description: "Deskripsi Produk 1", category: "Kuliner", link: "https://example.com/produk1" },
  { id: 2, name: "Produk 2", image: "https://via.placeholder.com/300x200?text=Produk+2", price: "Rp 200.000", shop: "Toko B", description: "Deskripsi Produk 2", category: "Fashion", link: "https://example.com/produk2" },
  { id: 3, name: "Produk 3", image: "https://via.placeholder.com/300x200?text=Produk+3", price: "Rp 300.000", shop: "Toko A", description: "Deskripsi Produk 3", category: "Kuliner", link: "https://example.com/produk3" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id);

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <div className="p-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto rounded-lg" />
          <div className="flex-1 md:pl-6 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg font-semibold text-gray-600 mb-2">{product.price}</p>
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
            <div key={relatedProduct.id} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{relatedProduct.name}</h3>
                <p className="text-gray-600">{relatedProduct.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
