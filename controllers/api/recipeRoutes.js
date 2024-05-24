const express = require("express");
const router = express.Router();
const recipeController = require("./recipeController");
const ensureAuthenticated = require("../../utils/authMiddleware");

// Recipe routes
router.get("/", ensureAuthenticated, recipeController.getRecipes);
router.post("/", ensureAuthenticated, recipeController.createRecipe);
router.post("/update", ensureAuthenticated, recipeController.updateRecipe);

module.exports = router;
