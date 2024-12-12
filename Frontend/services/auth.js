const apiroutes = import.meta.env.VITE_API_BASE_URL;

// Fungsi untuk registrasi pengguna
const registerUserPembeli = async (data) => {
  try {
    const response = await fetch(`${apiroutes}/auth/register`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registrasi gagal!");
    }

    return await response.json(); // Return hasil sukses
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan saat mendaftar.");
  }
};


// Fungsi untuk login pengguna
const loginUser = async (data) => {
  try {
    const response = await fetch(`${apiroutes}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login gagal!");
    }

    return await response.json(); // Return hasil sukses (token, user info, dll.)
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan saat login.");
  }
};

// Ekspor fungsi
export { registerUserPembeli, loginUser };
