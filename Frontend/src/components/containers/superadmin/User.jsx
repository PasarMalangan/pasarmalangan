import { useState, useEffect } from "react";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ role: "", name: "" });

  // Ambil data pengguna saat komponen dimuat
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Fungsi untuk mengambil data pengguna berdasarkan filter
  const fetchUsers = async () => {
    // Bangun query string berdasarkan kondisi
    const queryParams = new URLSearchParams();

    if (filter.role) queryParams.append("role", filter.role);
    if (filter.name) queryParams.append("name", filter.name);
    const response = await fetch(
      `${apiroutes}/user/users?${queryParams.toString()}`
    );
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (e) => {
    console.log("Change event", e.target.name, e.target.value);
    setFilter({
      ...filter,
      [e.target.name]: e.target.value === "Semua" ? "" : e.target.value,
    });
  };

  return (
<section>
  <h2 className="text-xl font-bold mb-4">Manajemen User</h2>

  {/* Filter */}
  <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
    <div className="mb-2 sm:mb-0 sm:mr-4">
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
    </div>

    <div className="flex items-center">
      <label className="mr-2">Nama:</label>
      <input
        type="text"
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
        className="border px-2 py-1"
        placeholder="Cari nama"
      />
    </div>
  </div>

  {/* Tabel Pengguna */}
  <div className="overflow-x-auto">
    <table className="w-full bg-white rounded-lg shadow-md">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Nomor Telepon</th>
          <th className="py-2 px-4 text-left">Role</th>
          <th className="py-2 px-4 text-left">Status</th>
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
  </div>
</section>

  );
};

export default UserManagement;
