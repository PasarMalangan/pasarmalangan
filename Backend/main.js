require("dotenv").config();
const express = require("express");
const app = express();
const pembeli = require("./models/pembeli");
const pedagang = require("./models/pedagang");
const superadmin = require("./models/superadmin");
const products = require("./models/products");
const categories = require("./models/categories");
const connectDB = require("./lib/mongodb");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT;
app.use(express.json());
const { authenticateToken } = require("./middlewares/auth");

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" })); // Sesuaikan dengan URL frontend

(async () => {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      console.log("Berhasil connect ke Database");
    }
  } catch (error) {
    console.error("Gagal connect ke Database", error);
  }
})(); // Immediately Invoked Function Expression (IIFE) || langsung dijalankan

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
// Endpoint untuk mengambil data user berdasarkan userId
app.get("/api/user", authenticateToken, async (req, res) => {
  const { role, userId } = req.user;

  let user;

  try {
    // Cek role dan ambil data dari model yang sesuai
    if (role === "pembeli") {
      user = await pembeli.findById(userId);
    } else if (role === "pedagang") {
      user = await pedagang.findById(userId);
    } else if (role === "superadmin") {
      user = await superadmin.findById(userId);
    } else {
      return res.status(400).json({ message: "Role tidak valid" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mengembalikan data pengguna sesuai role
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const {
      pedagang_id,
      name,
      description,
      harga,
      images,
      category,
      link_ecommerences,
    } = req.body; // Ambil data dari body request
    const newProduct = new products({
      pedagang_id,
      name,
      description,
      harga,
      images,
      category,
      link_ecommerences,
    });

    // Simpan data ke MongoDB
    await newProduct.save();
    res.status(201).json(newProduct); // Kembalikan response dengan data yang baru disimpan
  } catch (error) {
    console.error(error); // Log error ke console
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
});

app.listen(port, () =>
  console.log(`Listening on ${port}, udah jalan backendnya bro`)
);
