const jwt = require('jsonwebtoken');

const JWT_SECRET = "fasdkljio234jkohvsdjk"

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    console.log("!!!!!!!!!!!",JWT_SECRET)
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authenticate;

