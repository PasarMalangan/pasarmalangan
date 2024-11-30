require("dotenv").config();
const express = require("express");
const app = express();
const products = require("./models/products");
const categories = require("./models/categories");
const connectDB = require("./lib/mongodb");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT;
const frontend = process.env.FRONTEND_DEST;
const AWS = require("aws-sdk");
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: frontend })); // Sesuaikan dengan URL frontend

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '',
})

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
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


// app.post("/api/products", async (req, res) => {
//   try {
//     const {
//       pedagang_id,
//       name,
//       description,
//       harga,
//       images,
//       category,
//       link_ecommerences,
//     } = req.body; // Ambil data dari body request
//     const newProduct = new products({
//       pedagang_id,
//       name,
//       description,
//       harga,
//       images,
//       category,
//       link_ecommerences,
//     });

//     // Simpan data ke MongoDB
//     await newProduct.save();
//     res.status(201).json(newProduct); // Kembalikan response dengan data yang baru disimpan
//   } catch (error) {
//     console.error(error); // Log error ke console
//     res
//       .status(500)
//       .json({ message: "Gagal menyimpan data", error: error.message });
//   }
// });

app.listen(port, () =>
  console.log(`Listening on ${port}, udah jalan backendnya bro`)
);
