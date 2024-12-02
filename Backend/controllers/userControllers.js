const Pembeli = require("../models/pembeli");
const Pedagang = require("../models/pedagang");
const Superadmin = require("../models/superadmin");
const uploadFileToS3 = require("../lib/S3Upload");

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
  const updates = req.body; // Data update dari request body
  const file = req.file; // File dari multer

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

    // Jika ada file baru, upload ke S3 dan update profile picture
    if (file) {
      const bucketName = "assetuserspembeli";
      const uploadResult = await uploadFileToS3(file, bucketName);
      user.profilepict = uploadResult.Location;
      console.log("File uploaded to S3:", uploadResult);
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
  const updates = req.body; // Data update dari request body
  const file = req.file; // File dari multer
  console.log(updates);

  try {
    // Ambil data user pembeli dari database
    const user = await Pedagang.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Update hanya field yang disediakan dalam request body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // Jika ada file baru, upload ke S3 dan update profile picture
    if (file) {
      const bucketName = "assetuserspedagang";
      const uploadResult = await uploadFileToS3(file, bucketName);
      user.profilepict = uploadResult.Location;
      console.log("File uploaded to S3:", uploadResult);
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
