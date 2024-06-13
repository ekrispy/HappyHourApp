const jwt = require('jsonwebtoken');

// Middleware function to authenticate user
const auth = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');
  
  // If no token, return an error
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user object to the request
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token is not valid, return an error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Export the middleware
module.exports = auth;
