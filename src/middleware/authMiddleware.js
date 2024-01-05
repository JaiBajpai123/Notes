
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  try {
    if (!token) {
      throw new Error('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId;

    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Invalid token.');
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
