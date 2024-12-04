import { useState } from "react";

const User = () => {

  const [userList, setUserList] = useState([
    {
      foto: "/user1.jpg",
      name: "User 1",
      email: "user1@example.com",
      phone: "081234567890",
      role: "Admin",
    },
    {
      foto: "/user2.jpg", 
      name: "User 2",
      email: "user2@example.com",
      phone: "081234567891",
      role: "Penjual",
    },
    {
      foto: "/user3.jpg", 
      name: "User 3",
      email: "user3@example.com",
      phone: "081234567892",
      role: "Pembeli",
    },
  ]);


  const deleteUser = (index) => {
    setUserList(userList.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manajemen User</h2>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4">Foto Profil</th>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Nomor Telepon</th>
            <th className="py-2 px-4">Hak Akses</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4">
                <img
                  src={user.foto}
                  alt={`Foto ${user.name}`}
                  className="w-12 h-12 object-cover rounded-full"
                />
              </td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => deleteUser(index)}
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

export default User;
