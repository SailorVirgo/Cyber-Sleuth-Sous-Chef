const { User } = require("../../models");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ name: username, email, password });
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Registration sucessful, but login failed" });
      }
      return res
        .status(200)
        .json({ message: "Registration and login sucessful" });
    });
  } catch (error) {
    res.status(400).json({ message: "User resgistration failed", error });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.redirect("/login");
  });
};
