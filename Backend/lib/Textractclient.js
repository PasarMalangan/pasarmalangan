const {
  TextractClient,
  DetectDocumentTextCommand,
} = require("@aws-sdk/client-textract");

const textractClient = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const detectTextAndApprove = async (bucketName, fileName) => {
  const params = {
    Document: {
      S3Object: {
        Bucket: bucketName,
        Name: fileName,
      },
    },
  };

  try {
    const command = new DetectDocumentTextCommand(params);
    const response = await textractClient.send(command);

    // Menyaring teks yang terdeteksi untuk mencari kata 'Malang'
    let isMalangFound = false;

    response.Blocks.forEach((block) => {
      if (block.BlockType === "LINE") {
        const text = block.Text.toLowerCase();
        if (text.includes("malang")) {
          isMalangFound = true;
        }
      }
    });
    console.log(isMalangFound);
    return isMalangFound;
  } catch (error) {
    console.error("Error detecting text with Textract:", error);
    throw new Error("Error processing file for text detection");
  }
};

module.exports = { detectTextAndApprove };
