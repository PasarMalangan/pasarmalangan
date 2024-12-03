import { useState } from "react";

const KategoriProduk = () => {
    const [categories, setCategories] = useState("");
    const [categoryList, setCategoryList] = useState([
      "Elektronik",
      "Pakaian",
      "Makanan",
      "Peralatan Rumah Tangga",
    ]); 
    const [editIndex, setEditIndex] = useState(null);
    const [editCategory, setEditCategory] = useState("");


  const addCategory = () => {
    if (categories.trim()) {
      setCategoryList([...categoryList, categories.trim()]);
      setCategories("");
    }
  };


  const deleteCategory = (index) => {
    setCategoryList(categoryList.filter((_, i) => i !== index));
  };


  const startEdit = (index) => {
    setEditIndex(index);
    setEditCategory(categoryList[index]);
  };


  const saveEdit = () => {
    const updatedList = categoryList.map((cat, index) =>
      index === editIndex ? editCategory : cat
    );
    setCategoryList(updatedList);
    setEditIndex(null);
    setEditCategory("");
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manajemen Kategori Produk</h2>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Kategori Baru"
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambahkan
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Kategori</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((cat, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  cat
                )}
              </td>
              <td className="py-2 px-4 space-x-2">
                {editIndex === index ? (
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteCategory(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default KategoriProduk;
