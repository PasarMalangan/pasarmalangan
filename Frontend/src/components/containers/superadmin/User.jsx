import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ role: "", name: "" });

  // Ambil data pengguna saat komponen dimuat
  useEffect(() => {
    fetchUsers();
  }, [filter]); // Menambahkan dependensi filter untuk memperbarui data setiap kali filter berubah

  // Fungsi untuk mengambil data pengguna berdasarkan filter
  const fetchUsers = async () => {
    // Bangun query string berdasarkan kondisi
    const queryParams = new URLSearchParams();

    if (filter.role) queryParams.append("role", filter.role);
    if (filter.name) queryParams.append("name", filter.name);
    const response = await fetch(
      `http://localhost:5000/api/user/users?${queryParams.toString()}`
    );
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (e) => {
    console.log("Change event", e.target.name, e.target.value); // Log perubahan setiap input
    setFilter({
      ...filter,
      [e.target.name]: e.target.value === "Semua" ? "" : e.target.value, // Set "" jika "Semua"
    });
  };

  useEffect(() => {
    console.log(filter); // Ini akan memantau setiap perubahan pada filter
  }, [filter]); // Akan dipicu setiap kali `filter` berubah

  console.log(filter);
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2">Role:</label>
        <select
          name="role"
          value={filter.role}
          onChange={handleFilterChange}
          className="border px-2 py-1"
        >
          <option value="">Semua</option>
          <option value="pedagang">Pedagang</option>
          <option value="pembeli">Pembeli</option>
          <option value="superadmin">Superadmin</option>
        </select>

        <label className="ml-4 mr-2">Nama:</label>
        <input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          className="border px-2 py-1"
          placeholder="Cari nama"
        />
      </div>

      {/* Tabel Pengguna */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Nomor Telepon</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                {user.notelepon || "Tidak Ditemukan"}
              </td>
              <td className="py-2 px-4">{user.role}</td>
              {user.role === "pedagang" && (
                <td className="py-2 px-4">
                  {user.isApproved ? <p>Active</p> : <p>Not Active</p>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserManagement;
