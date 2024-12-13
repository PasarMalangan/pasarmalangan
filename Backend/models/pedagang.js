const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const pedagangSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    notelepon: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password harus terdiri dari minimal 8 karakter"],
    },
    role: { type: String, required: true, default: "pedagang" },
    namausaha: { type: String, required: true },
    alamatusaha: { type: String, required: true },
    category: { type: String, default: null },
    description: { type: String, default: null },
    identitaspedagang: { type: String, required: true },
    linkecommerences: { type: String, default: null },
    profilepict: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOG6E-AnifHE0PvMzIpCiDOZy1nWhJXXMZPg&s",
    },
    isApproved: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
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
