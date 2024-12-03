const Pembeli = require("../models/pembeli");
const Pedagang = require("../models/pedagang");
const Superadmin = require("../models/superadmin");
const { uploadFileToS3, deleteFileFromS3 } = require("../lib/S3client");
require("dotenv").config();
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
  const updates = req.body;
  const file = req.file;

  try {
    // Ambil data user pembeli dari database
    const user = await Pembeli.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Update field yang diberikan dalam request body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });
    
    const bucketName = process.env.BUCKET_ASBY;

    // Jika ada file baru (foto profil baru), hapus foto lama dari S3
    if (file) {
      // Jika ada foto profil lama, hapus dari S3
      if (user.profilepict) {
        await deleteFileFromS3(user.profilepict, bucketName); // Hapus foto lama
      }

      // Upload foto profil baru ke S3
      const uploadResult = await uploadFileToS3(file, bucketName);
      user.profilepict = uploadResult.Location; // Update URL foto profil baru
    }

    // Simpan perubahan ke database
    await user.save();

    res.json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};

exports.editpedagang = async (req, res) => {
  const { userId } = req.user;
  const updates = req.body;
  const file = req.file;

  try {
    const user = await Pedagang.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Update hanya field yang disediakan dalam request body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    const bucketName = process.env.BUCKET_ASSL;

    // Jika ada file baru (foto profil baru), hapus foto lama dari S3
    if (file) {
      // Jika ada foto profil lama, hapus dari S3
      if (user.profilepict) {
        await deleteFileFromS3(user.profilepict, bucketName); // Hapus foto lama
      }

      // Upload foto profil baru ke S3
      const uploadResult = await uploadFileToS3(file, bucketName);
      user.profilepict = uploadResult.Location; // Update URL foto profil baru
    }

    await user.save();

    res.json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};
