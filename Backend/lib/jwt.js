module.exports = {
    secret: process.env.JWT_SECRET || 'yoursecretkey',
    expiresIn: '1d', // Token valid selama 1 hari
  };
  