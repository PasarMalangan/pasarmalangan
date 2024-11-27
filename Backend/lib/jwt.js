require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d', // Token valid selama 1 hari
  };
  