const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const pedagangSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    notelepon: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "pedagang" },
    namausaha: { type: String, required: true },
    alamatusaha: { type: String, required: true },
    categorie: { type: String, default: null },
    description: { type: String, default: null },
    identitaspedagang: { type: String, required: true },
    linkecommerences: { type: [String], default: [] },
    profilepict: { type: String, default: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"},
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

pedagangSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

pedagangSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const pedagang = mongoose.model("pedagang", pedagangSchema);

module.exports = pedagang;