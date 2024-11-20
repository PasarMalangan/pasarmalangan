const pembeli = require("./models/pembeli");
const pedagang = require("./models/pedagang");
const superadmin = require("./models/superadmin");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const budi = new pembeli({
//     name: "budi",
//     username: "budiblack",
//     email: "budiblack@gmail.com",
//     notelepon: "0812984102",
//     password: "12133",
//     role: "pembeli",
//     tanggallahir: "2003-02-02",
//     jeniskelamin: "Laki-laki",
//     wishlist: ["baju", "sempak"],
//     created_at: new Date(),
//     updated_at: new Date()
// });
// budi
//     .save()
//     .then(
//         () => console.log("One entry added"),
//         (err) => console.log(err)
//     );
app.get("/api/pembeli/get", async (req, res) => {
  const pembelis = await pembeli.find();
  res.json(pembelis);
});

app.post("/api/pembeli/create", async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      notelepon,
      password,
      role,
      tanggallahir,
      jeniskelamin,
      wishlist,
    } = req.body; // Ambil data dari body request
    const newPembeli = new pembeli({
      name,
      username,
      email,
      notelepon,
      password,
      role,
      tanggallahir,
      jeniskelamin,
      wishlist,
    });

    // Simpan data ke MongoDB
    await newPembeli.save();
    res.status(201).json(newPembeli); // Kembalikan response dengan data yang baru disimpan
  } catch (error) {
    console.error(error); // Log error ke console
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
});
app.get("/api/pedagang/get", async (req, res) => {
  const pedagangs = await pedagang.find();
  res.json(pedagangs);
});

app.post("/api/pedagang/create", async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      notelepon,
      password,
      role,
      namausaha,
      alamatusaha,
      categorie,
      identitaspedagang,
      linkecommerences
    } = req.body; // Ambil data dari body request
    const newPedagang = new pedagang({
      name,
      username,
      email,
      notelepon,
      password,
      role,
      namausaha,
      alamatusaha,
      categorie,
      identitaspedagang,
      linkecommerences
    });

    // Simpan data ke MongoDB
    await newPedagang.save();
    res.status(201).json(newPedagang); // Kembalikan response dengan data yang baru disimpan
  } catch (error) {
    console.error(error); // Log error ke console
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
});




app.listen(port);
