const mongoose = require("mongoose");

const superadminSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'superadmin'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const superadmin = mongoose.model("superadmin", superadminSchema);

module.exports = superadmin;