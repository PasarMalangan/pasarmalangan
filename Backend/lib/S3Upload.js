const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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

module.exports = uploadFileToS3;
