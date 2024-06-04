const express = require("express");
const { User } = require("../../models");
const passport = require("passport");
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received registration data:", req.body);

  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log("line 13:", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = await User.create({ name: username, email, password });
    console.log("line 19:", newUser);

    req.login(newUser, (err) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "Registration successful, but login failed",
            error: err,
          });
      }
      res.status(200).json({ message: "Registration and login successful" });
    });
  } catch (error) {
    console.error("Database error:", error); // Log the error details
    res.status(400).json({ message: "User registration failed", error });
  }
});

// Login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({
          message: "An error occurred during authentication",
          error: err,
        });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res
          .status(500)
          .json({ message: "Login failed", error: loginErr });
      }
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.redirect("/login");
  });
});

module.exports = router;
