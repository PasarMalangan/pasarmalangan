require("dotenv").config();
const express = require("express");
const app = express();
const products = require("./models/products");
const categories = require("./models/categories");
const connectDB = require("./lib/mongodb");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const port = process.env.PORT;
const frontend = process.env.FRONTEND_DEST;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ origin: frontend })); // Sesuaikan dengan URL frontend

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
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () =>
  console.log(`Listening on ${port}, udah jalan backendnya bro`)
);

