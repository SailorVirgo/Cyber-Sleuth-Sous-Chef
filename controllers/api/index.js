const router = require("express").Router();

const authRoutes = require("./authRouter");
const recipeRoutes = require("./recipeRouter");

router.use("/user", authRoutes);
router.use("/recipe", recipeRoutes);

module.exports = router;
