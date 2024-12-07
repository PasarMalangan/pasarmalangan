const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config();

// Membuat instance dari S3Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

// Fungsi untuk meng-upload file ke S3
const uploadFileToS3 = async (file, bucketName) => {
  try {
    const key = `${Date.now()}_${file.originalname}`; // Buat key unik
    const input = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(input);
    await s3Client.send(command); // Upload file

    // Buat URL berdasarkan bucket dan key
    return {
      Location: `https://${bucketName}.s3.amazonaws.com/${key}`,
      Key: key,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Fungsi untuk menghapus file dari S3
const deleteFileFromS3 = async (fileUrls, bucketName) => {
  try {
    if (Array.isArray(fileUrls)) {
      // Jika fileUrls adalah array, iterasi dan hapus setiap file
      for (const fileUrl of fileUrls) {
        const fileName = fileUrl.split('/').pop(); // Ambil nama file dari URL

        const command = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: fileName, // Menggunakan nama file sebagai key untuk menghapusnya
        });

        await s3Client.send(command); // Menghapus file
      }
    } else {
      // Jika hanya satu URL, hapus seperti biasa
      const fileName = fileUrls.split('/').pop();

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      });

      await s3Client.send(command); // Menghapus file
    }
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error;
  }
};

module.exports = { uploadFileToS3, deleteFileFromS3 };
