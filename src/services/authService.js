
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async ({ username, password }) => {
  const user = new User({ username, password });
  await user.save();
  return user;
};

exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  return token;
};
