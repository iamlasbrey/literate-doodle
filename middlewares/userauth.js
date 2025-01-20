const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
      req.user = decoded; // Attach decoded user info to request
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = authenticateUser;