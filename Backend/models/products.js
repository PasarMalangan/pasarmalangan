const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId, // Referensi ke pengguna
      required: true,
      ref: "pedagangs", // Nama koleksi referensi
    },
    namausaha: {
      type: String,
      required: true,
    },
    alamatusaha: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    harga: {
      type: Number,
      required: true,
      min: [0, "Harga tidak boleh negatif"],
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    linkecommerences: {
      type: [String],
    },
    isApproved: {
      type: String,
      enum: ["pending", "ditolak", "disetujui"],
      default: "pending",
    },
    click: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Menyimpan waktu pembuatan dan pembaruan
);

const products = mongoose.model("product", productSchema);

module.exports = products;
