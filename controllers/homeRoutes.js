const express = require("express");
const router = express.Router();
const homeController = require("./homeController");
const ensureAuthenticated = require("../utils/authMiddleware");

// Home route
router.get("/", homeController.getHome);

// Dashboard route (requires authentication)
router.get("/dashboard", ensureAuthenticated, homeController.getDashboard);



module.exports = router;
