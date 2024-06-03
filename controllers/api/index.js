const router = require("express").Router();
const authRouter = require("./authRouter");
const recipeRouter = require("./recipeRouter");

router.use("/user", authRouter);
router.use("/recipe", recipeRouter);

module.exports = router;
