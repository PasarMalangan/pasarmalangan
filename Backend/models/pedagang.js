const mongoose = require("mongoose");

const pedagangSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    notelepon: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'pedagang'},
    namausaha: {type: String, required: true},
    alamatusaha: {type: String, required: true},
    categorie: {type: String, required: true},
    identitaspedagang: {type: String, required: true},
    linkecommerences: {type: [String], required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const pedagang = mongoose.model("pedagang", pedagangSchema);

module.exports = pedagang;