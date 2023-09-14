// middleware/authMiddleware.js
const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
