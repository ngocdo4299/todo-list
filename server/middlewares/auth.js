const authService = require('../services/auth');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    req.user = authService.verify(token);
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    authenticate,
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    },
  ];
};

module.exports = {
  authenticate,
  authorize,
};
