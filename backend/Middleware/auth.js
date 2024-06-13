const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach the decoded user object
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
