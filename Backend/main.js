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

app.get("/", (req, res) => {
  res.send("sagdjas");
});
app.listen(port, () =>
  console.log(`Listening on ${port}, udah jalan backendnya bro`)
);
