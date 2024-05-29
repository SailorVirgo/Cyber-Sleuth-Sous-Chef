const homeController = require("./homeController");
const homeRoutes = require("./homeRoutes");
const authController = require("./api/authController");
const authRoutes = require("./api/authRoutes");
const recipeController = require("./api/recipeController");
const recipeRoutes = require("./api/recipeRoutes");

module.exports = {
  homeController,
  homeRoutes,
  authController,
  authRoutes,
  recipeController,
  recipeRoutes,
};
