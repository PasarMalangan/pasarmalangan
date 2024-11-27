const pembeli = require("../models/pembeli");
const pedagang = require("../models/pedagang");
const superAdmin = require("../models/superadmin");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../lib/jwt");

exports.register = async (req, res) => {
  const { role, ...data } = req.body;
  console.log("Data yang diterima dari client:", { role, ...data });

  try {
    let user;
    if (role === "pembeli") {
      user = new pembeli(data);
    } else if (role === "pedagang") {
      user = new pedagang(data);
    } else if (role === "superadmin") {
      user = new superAdmin(data);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();
    res.status(201).json({ message: `${role} berhasil mendaftar, silahkan login ke Pasar Malangan 🤩`, user });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email atau Username sudah terdaftar" });
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
