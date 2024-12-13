const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const pembeliSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    notelepon: { type: String, unique: true, sparse: true },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password harus terdiri dari minimal 8 karakter"],
    },
    role: { type: String, required: true, default: "pembeli" },
    tanggallahir: { type: Date, default: null },
    jeniskelamin: { type: String, default: null },
    profilepict: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOG6E-AnifHE0PvMzIpCiDOZy1nWhJXXMZPg&s",
    },
    wishlist: { type: [String], default: [] },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

pembeliSchema.pre("validate", function (next) {
  if (this.notelepon === "") {
    // Jika notelepon kosong
    this.notelepon = null; // Set nilai menjadi null
  }
  next(); // Lanjutkan ke validasi berikutnya
});
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
