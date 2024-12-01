const pembeli = require("../models/pembeli");
const pedagang = require("../models/pedagang");
const superAdmin = require("../models/superadmin");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../lib/jwt");
const uploadFileToS3 = require("../lib/S3Upload");
// Contoh penggunaan di controller
exports.register = async (req, res) => {
  const { role, ...data } = req.body;
  const file = req.file; // Mendapatkan file dari req.file
  console.log("Data yang diterima dari client:", { role, ...data });
  console.log("File yang diterima:", file);

  try {
    let user;

    // Validasi role
    if (!role) {
      return res.status(400).json({ message: "Role tidak boleh kosong" });
    }

    if (role === "pedagang") {
      if (!file) {
        return res
          .status(400)
          .json({ message: "File wajib diunggah untuk pedagang" });
      }

      // Upload file ke S3 menggunakan fungsi yang telah dibuat
      const bucketName = "identityseller";
      const uploadResult = await uploadFileToS3(file, bucketName);

      // Menambahkan URL file yang di-upload ke data pedagang
      data.identitaspedagang = uploadResult.Location;  // Menggunakan URL file dari S3
      console.log("File uploaded to S3:", uploadResult);

      // Membuat objek pedagang dengan data yang sudah diperbarui
      user = new pedagang(data);
    } else if (role === "pembeli") {
      user = new pembeli(data);
    } else if (role === "superadmin") {
      user = new superAdmin(data);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Menyimpan data user ke database
    await user.save();

    // Pesan sukses tergantung role
    const successMessage =
      role === "pedagang"
        ? "Pendaftaran berhasil, silahkan tunggu konfirmasi untuk login ke dashboard."
        : `Pendaftaran berhasil, silahkan login ke Pasar Malangan 🤩`;

    res.status(201).json({
      message: successMessage,
      user,
    });
  } catch (error) {
    // Menangani error duplikat (MongoDB)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email atau Username sudah terdaftar" });
    }

    // Menangani error lainnya
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
