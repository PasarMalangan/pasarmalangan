const pembeli = require('../models/pembeli');
const pedagang = require('../models/pedagang');
const superAdmin = require('../models/superadmin');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../lib/jwt');

exports.register = async (req, res) => {
  const { role, ...data } = req.body;

  try {
    let user;
    if (role === 'pembeli') {
      user = new pembeli(data);
    } else if (role === 'pedagang') {
      user = new pedagang(data);
    } else if (role === 'superadmin') {
      user = new superAdmin(data);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await user.save();
    res.status(201).json({ message: `${role} registered successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek semua koleksi user secara berurutan
    let user, role;

    user = await pembeli.findOne({ email });
    if (user) role = 'pembeli';

    if (!user) {
      user = await pedagang.findOne({ email });
      if (user) role = 'pedagang';
    }

    if (!user) {
      user = await superAdmin.findOne({ email });
      if (user) role = 'superadmin';
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifikasi password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT dengan role
    const token = jwt.sign({ userId: user._id, role }, secret, { expiresIn });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};