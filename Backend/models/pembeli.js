const mongoose = require("mongoose");

const pembeliSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    notelepon: String,
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'pembeli'},
    tanggallahir: Date,
    jeniskelamin: {type: String, required: true},
    wishlist: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const pembeli = mongoose.model("pembeli", pembeliSchema);

module.exports = pembeli;