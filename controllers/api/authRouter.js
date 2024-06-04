const express = require("express");
const { User } = require("../../models");
const passport = require("passport");
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received registration data:", req.body);

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = await User.create({ name: username, email, password });
      req.login(newUser, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Registration successful, but login failed" });
        }
        req.session.save(() => {
          req.session.user_id = newUser.id;
          req.session.logged_in = true;
          console.log("Session after registration:", req.session);
          res
            .status(200)
            .json({ message: "Registration and login successful" });
        });
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(400).json({ message: "User registration failed", error });
  }
});

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  req.session.save(() => {
    req.session.user_id = req.user.id;
    req.session.logged_in = true;
    console.log("Session after login:", req.session);
    res.json({ message: "Login successful" });
  });
});

// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Session destruction failed", error: err });
      }
      res.redirect("/login");
    });
  });
});

module.exports = router;
