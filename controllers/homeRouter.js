const express = require("express");
const { Recipes, User } = require("../models");
const router = express.Router();

// Home route
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipes.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render("home", {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error("Error fetching home route data:", err);
    res.status(500).json(err);
  }
});

// Dashboard route
router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    console.log("User is not logged in, redirecting to login page");
    return res.redirect("/login");
  }

  try {
    console.log("Fetching user data for user ID:", req.session.user_id);

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Recipes }],
    });

    if (!userData) {
      console.error("No user found with ID:", req.session.user_id);
      return res.status(404).json({ message: "User not found" });
    }

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Register route
router.get("/register", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("register");
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
