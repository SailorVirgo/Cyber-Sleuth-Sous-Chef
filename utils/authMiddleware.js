module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticared()) {
    return next();
  }
  res.redirect("/login");
};
