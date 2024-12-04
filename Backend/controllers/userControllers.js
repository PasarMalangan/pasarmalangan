const Pembeli = require("../models/pembeli");
const Pedagang = require("../models/pedagang");
const Superadmin = require("../models/superadmin");

exports.getuser = async (req, res) => {
  const { role, userId } = req.user; // Data dari middleware auth

  let user;

  try {
    // Cek role dan ambil data dari model yang sesuai
    if (role === "pembeli") {
      user = await Pembeli.findById(userId);
    } else if (role === "pedagang") {
      user = await Pedagang.findById(userId);
    } else if (role === "superadmin") {
      user = await Superadmin.findById(userId);
    } else {
      return res.status(400).json({ message: "Role tidak valid" });
    }

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // // Kirim data user tanpa password
    // const { password, ...userData } = user.toObject();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data pengguna",
      error,
    });
  }
};

exports.editpembeli = async (req, res) => {
  const { userId } = req.user;
  const updates = req.body; // Ambil data update dari request body

  try {
    // Ambil data user pembeli dari database
    const user = await Pembeli.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Update hanya field yang disediakan dalam request body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save(); // Simpan perubahan
    res.json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui profil", error });
  }
};
