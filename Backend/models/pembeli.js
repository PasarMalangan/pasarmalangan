const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const pembeliSchema = new mongoose.Schema(
  {
    name: { type: String, default: null},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    notelepon: {type: String, unique:true, sparse: true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: "pembeli" },
    tanggallahir: {type: Date, default: null},
    jeniskelamin: { type: String, default: null},
    profilepict: { type: String, default: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"},
    wishlist: {type: [String], default: null},
  },
  { timestamps: true }
);

pembeliSchema.pre("validate", function (next) {
  if (this.notelepon === "") {   // Jika notelepon kosong
    this.notelepon = null;        // Set nilai menjadi null
  }
  next();                         // Lanjutkan ke validasi berikutnya
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
