const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const superadminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "superadmin" },
  },
  { timestamps: true }
);

superadminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

superadminSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const superadmin = mongoose.model("superadmin", superadminSchema);

module.exports = superadmin;
