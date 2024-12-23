export default function NavAdmin() {
  return (
    <header>
      <nav className="w-64 bg-blue-600 text-white flex flex-col">
        <h1 className="text-center text-2xl font-bold py-4 border-b border-blue-400">
          Admin Dashboard
        </h1>
        <ul className="flex-1">
          <li
            onClick={() => setActiveTab("produk")}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === "produk" ? "bg-blue-800" : "hover:bg-blue-500"
            }`}
          >
            Manajemen Produk
          </li>
          <li
            onClick={() => setActiveTab("user")}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === "user" ? "bg-blue-800" : "hover:bg-blue-500"
            }`}
          >
            Manajemen User
          </li>
          <li
            onClick={() => setActiveTab("kategori")}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === "kategori" ? "bg-blue-800" : "hover:bg-blue-500"
            }`}
          >
            Manajemen Kategori Produk
          </li>
        </ul>
      </nav>
    </header>
  );
}
