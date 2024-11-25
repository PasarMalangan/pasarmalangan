const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const pembeliSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    notelepon: String,
    password: { type: String, required: true },
    role: { type: String, required: true, default: "pembeli" },
    tanggallahir: Date,
    jeniskelamin: { type: String },
    wishlist: {type: [String], default: null},
  },
  { timestamps: true }
);
pembeliSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

pembeliSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const pembeli = mongoose.model("pembeli", pembeliSchema);

module.exports = pembeli;
