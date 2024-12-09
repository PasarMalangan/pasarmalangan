const pembeli = require("../models/pembeli");
const pedagang = require("../models/pedagang");
const superAdmin = require("../models/superadmin");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../lib/jwt");
const { uploadFileToS3 } = require("../lib/S3client");
const { detectTextAndApprove } = require("../lib/Textractclient");
require("dotenv").config();

const checkEmailExists = async (email) => {
  const existsInPedagang = await pedagang.findOne({ email });
  const existsInPembeli = await pembeli.findOne({ email });
  const existsInSuperAdmin = await superAdmin.findOne({ email });

  return existsInPedagang || existsInPembeli || existsInSuperAdmin;
};

exports.register = async (req, res) => {
  const { role, ...data } = req.body;
  const file = req.file;

  try {
    if (!role) {
      return res.status(400).json({ message: "Role tidak boleh kosong" });
    }

    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    let user;

    if (role === "pedagang") {
      if (!file) {
        return res
          .status(400)
          .json({ message: "File wajib diunggah untuk pedagang" });
      }

      // Upload file ke S3
      const bucketName = process.env.BUCKET_IDSL;
      const uploadResult = await uploadFileToS3(file, bucketName);
      data.identitaspedagang = uploadResult.Location;

      // Deteksi teks di dalam file menggunakan AWS Textract
      const isMalangFound = await detectTextAndApprove(
        bucketName,
        uploadResult.Key
      );

      // Tambahkan field isApproved berdasarkan hasil deteksi teks
      data.isApproved = isMalangFound ? true : false;

      user = new pedagang(data);
    } else if (role === "pembeli") {
      user = new pembeli(data);
    } else if (role === "superadmin") {
      user = new superAdmin(data);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();

    const successMessage =
      role === "pedagang"
        ? "Pendaftaran berhasil, silahkan tunggu konfirmasi untuk login ke dashboard."
        : "Pendaftaran berhasil, silahkan login ke Pasar Malangan 🤩";

    res.status(201).json({ message: successMessage, user });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email atau Nomor Telepon sudah terdaftar" });
    }

    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek pengguna di semua koleksi secara berurutan
    let user;
    let role;

    const roles = [
      { model: pembeli, roleName: "pembeli" },
      { model: pedagang, roleName: "pedagang" },
      { model: superAdmin, roleName: "superadmin" },
    ];

    // Looping untuk menemukan user di koleksi yang sesuai
    for (const item of roles) {
      user = await item.model.findOne({ email });
      if (user) {
        role = item.roleName;
        break;
      }
    }

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role === "pedagang" && !user.isApproved) {
      return res.status(403).json({
        message:
          "Akun belum bisa masuk ke dashboard, silahkan tunggu konfirmasi dari Admin.",
      });
    }

    // Verifikasi password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT dengan informasi pengguna
    const token = jwt.sign({ userId: user._id, role }, secret, { expiresIn });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
