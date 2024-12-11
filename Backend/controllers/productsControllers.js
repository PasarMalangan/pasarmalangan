const Product = require("../models/products");
const Pedagang = require("../models/pedagang");
const { uploadFileToS3, deleteFileFromS3 } = require("../lib/S3client");
require("dotenv").config();
exports.getProductbyUserId = async (req, res) => {
  const { userId } = req.user; // Ambil data user yang sudah diset di middleware

  try {
    // Periksa apakah userId ada
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID tidak ditemukan",
      });
    }

    // Cari produk berdasarkan owner_id yang sesuai dengan user yang sedang login
    const products = await Product.find({ owner_id: userId });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan, silahkan tambahkan produk",
      });
    }

    // Kirim data produk
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Cari produk berdasarkan ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data produk",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, harga, category, linkecommerences, isApproved } =
    req.body;

  const { userId } = req.user;

  const files = req.files;
  let images = [];

  // Upload gambar ke S3 jika ada
  if (files && files.length > 0) {
    const bucketName = process.env.BUCKET_PRD; // Bucket S3 untuk produk
    for (let file of files) {
      const uploadResult = await uploadFileToS3(file, bucketName);
      images.push(uploadResult.Location);
    }
  }

  try {
    // Ambil nama usaha berdasarkan userId
    const pedagang = await Pedagang.findById(userId);
    if (!pedagang) {
      return res.status(404).json({
        success: false,
        message: "Pedagang tidak ditemukan",
      });
    }

    const namausaha = pedagang.namausaha;
    const alamatusaha = pedagang.alamatusaha;

    // Buat produk baru
    const newProduct = new Product({
      name,
      description,
      harga,
      images,
      category,
      linkecommerences,
      isApproved,
      owner_id: userId,
      namausaha,
      alamatusaha,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan produk",
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    const bucketName = process.env.BUCKET_PRD;
    // Hapus gambar dari S3 jika ada
    if (product.images) {
      await deleteFileFromS3(product.images, bucketName);
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus produk" });
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const files = req.files;
  try {
    const product = await Product.findById(id);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const bucketName = process.env.BUCKET_PRD;

    // Jika ada file baru diunggah, hapus gambar lama dan upload yang baru
    if (files && files.length > 0) {
      // Hapus gambar lama dari S3
      if (product.images && product.images.length > 0) {
        await deleteFileFromS3(product.images, bucketName);
      }

      // Upload gambar baru ke S3
      let newImages = [];
      for (let file of files) {
        const uploadResult = await uploadFileToS3(file, bucketName);
        newImages.push(uploadResult.Location);
      }

      // Update field gambar produk dengan gambar baru
      updates.images = newImages;
    }

    // Update field produk dengan data baru dari request body
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    // Simpan perubahan ke database
    await product.save();

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui produk",
      error: error.message,
    });
  }
};

exports.approveProduct = async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }

    // Update status produk
    product.isApproved = isApproved;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Status produk berhasil diperbarui",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status produk",
      error: err.message,
    });
  }
};
