
const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.json(user);
  } catch (error) {
    next(error); 
  }
};

exports.login = async (req, res, next) => {
    try {
      const token = await authService.login(req.body);
      res.header('Authorization', token);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  };
