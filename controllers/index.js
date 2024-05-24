const homeController = require("./homeController");
const homeRoutes = require("./homeRoutes");
const { authController, recipeController } = require("./api");
const authRoutes = require("./api/authRoutes");
const recipeRoutes = require("./api/recipeRoutes");

module.exports = {
  homeController,
  homeRoutes,
  authController,
  recipeController,
  authRoutes,
  recipeRoutes,
};
