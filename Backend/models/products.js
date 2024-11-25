const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    pedagang_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    harga: { type: Number, required: true },
    images: { type: String, required: true },
    category: { type: String, required: true },
    link_ecommerences: { type: [String], required: true },
    isApproved: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const products = mongoose.model("product", productsSchema);

module.exports = products;
