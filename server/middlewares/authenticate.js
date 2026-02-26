const { verifyToken } = require('../utilities/tokenHandler');
const AppError = require('../utilities/AppError');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No token provided', 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token); 
    req.user = payload;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

module.exports=authenticate;