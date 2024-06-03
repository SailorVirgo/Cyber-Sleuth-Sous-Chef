exports.getHome = (req, res) => {
  res.render("homepage", { user: req.user });
};

exports.getDashboard = (req, res) => {
  res.render("dashboard", { user: req.user });
};
