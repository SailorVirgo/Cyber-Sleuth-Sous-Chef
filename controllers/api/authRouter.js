const express = require("express");
const { User } = require("../../models");
const passport = require("passport");
const router = express.Router();
const passport = require("passport");

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received registration data:", req.body);

  try {
    const user = await User.findOne({ where: { email } });
    console.log("line 13:", user);
    if (user) {
      return res.render("register");
    } else {
      const userData = await User.create(req.body);
      console.log("line 19:", userData);

      res.render("/home");
      req.session.save;
    }

    const newUser = await User.create({ name: username, email, password });
    console.log("line 19:", newUser);

    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({
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

// router.post('/login', (req, res) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',

//   });
// });

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
