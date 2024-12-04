import { useState } from "react";

const ApproveProduk = () => {
  const [productList, setProductList] = useState([
    {
      namausaha: "Toko Bang Rusdi",
      name: "Produk 1",
      harga: "Rp: " + 100000,
      image: "/placeholder.jpg",
      description: "Deskripsi Produk 1",
      link: [
        "https://example.com/produk1",
        "https://example.com/produk2",
        "https://example.com/produk3",
      ],
      status: "Hidden",
    },
    {
      namausaha: "Toko Bang Paris",
      name: "Produk 2",
      harga: "Rp: " + 100000,
      image: "/placeholder.jpg",
      description: "Deskripsi Produk 2",
      link: "https://example.com/produk1",
      status: "Hidden",
    },
    {
      namausaha: "Toko Bang Amba",
      name: "Produk 3",
      harga: "Rp: " + 100000,
      image: "/placeholder.jpg",
      description: "Deskripsi Produk 3",
      link: "https://example.com/produk1",
      status: "Hidden",
    },
  ]);


  const updateStatus = (namausaha, newStatus) => {
    setProductList(
      productList.map((product) =>
        product.namausaha === namausaha ? { ...product, status: newStatus } : product
      )
    );
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manajemen Produk</h2>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4">Nama Usaha</th>
            <th className="py-2 px-4">Nama Produk</th>
            <th className="py-2 px-4">Harga</th>
            <th className="py-2 px-4">Gambar</th>
            <th className="py-2 px-4">Deskripsi</th>
            <th className="py-2 px-4">Link</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={product.namausaha} className="hover:bg-gray-100">
              <td className="py-2 px-4">{product.namausaha}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.harga}</td>
              <td className="py-2 px-4">
                <img
                  src={product.image}
                  alt="Gambar Produk"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4">
                {Array.isArray(product.link) ? (
                  product.link.map((item, i) => (
                    <div key={i}>
                      <a
                        href={item}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {item}
                      </a>
                    </div>
                  ))
                ) : (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {product.link}
                  </a>
                )}
              </td>
              <td className="py-2 px-4">{product.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => updateStatus(product.namausaha, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Setujui
                </button>
                <button
                  onClick={() => updateStatus(product.namausaha, "Rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Tolak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ApproveProduk;
