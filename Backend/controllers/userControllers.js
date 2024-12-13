const Pembeli = require("../models/pembeli");
const Pedagang = require("../models/pedagang");
const Superadmin = require("../models/superadmin");
const Product = require("../models/products");
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

exports.getUsers = async (req, res) => {
  const { role, name } = req.query;

  try {
    let filter = {};

    // Filter berdasarkan nama jika ada (case-insensitive)
    if (name) filter.name = { $regex: name, $options: "i" };

    let users = [];

    if (role) {
      // Jika role diberikan, filter berdasarkan role dan ambil data dari koleksi yang sesuai
      if (role === "pedagang") {
        users = await Pedagang.find(filter);
      } else if (role === "pembeli") {
        users = await Pembeli.find(filter);
      } else if (role === "superadmin") {
        users = await Superadmin.find(filter);
      } else {
        return res.status(400).json({ message: "Role tidak valid" });
      }
    } else {
      // Jika role tidak ada, ambil data dari semua koleksi
      const pedagang = await Pedagang.find(filter);
      const pembeli = await Pembeli.find(filter);
      const superadmin = await Superadmin.find(filter);

      // Gabungkan semua data
      users = [...pedagang, ...pembeli, ...superadmin];
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengfilter data pengguna",
      error,
    });
  }
};

exports.getTokobyId = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Pedagang.findById(id);
    if (!store) {
      return res.status(404).json({ message: "Toko tidak ditemukan" });
    }
    res.json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ message: "Gagal memuat data toko" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const pembeliId = req.user.userId;

    // Validasi keberadaan produk dengan status disetujui
    const productExists = await Product.findOne({
      _id: productId,
      isApproved: "disetujui",
    });

    if (!productExists) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan atau belum disetujui" });
    }

    const pembeli = await Pembeli.findById(pembeliId);
    if (!pembeli) {
      return res.status(404).json({ message: "Silahkan Login sebagai Pembeli untuk menambahkan ke wishlist" });
    }

    if (!pembeli.wishlist.includes(productId)) {
      pembeli.wishlist.push(productId);
      await pembeli.save();
      return res
        .status(200)
        .json({ message: "Produk berhasil ditambahkan ke wishlist" });
    } else {
      return res.status(400).json({ message: "Produk sudah ada di wishlist" });
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const pembeliId = req.user.userId;

    const pembeli = await Pembeli.findById(pembeliId);
    if (!pembeli) {
      return res.status(404).json({ message: "Pembeli tidak ditemukan" });
    }

    const initialLength = pembeli.wishlist.length;
    pembeli.wishlist = pembeli.wishlist.filter(
      (id) => id.toString() !== productId
    );

    if (pembeli.wishlist.length === initialLength) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan di wishlist" });
    }

    // Simpan perubahan
    await pembeli.save();

    res.status(200).json({ message: "Produk berhasil dihapus dari wishlist" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const pembeliId = req.user.userId;

    const pembeli = await Pembeli.findById(pembeliId).populate("wishlist");

    if (!pembeli) {
      return res.status(404).json({ message: "Pembeli tidak ditemukan" });
    }

    const wishlistProducts = await Product.find({
      _id: { $in: pembeli.wishlist },
    });

    return res.status(200).json({ wishlist: wishlistProducts });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
