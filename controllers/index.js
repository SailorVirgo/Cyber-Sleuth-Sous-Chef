// const homeController = require("./homeController");
// const homeRoutes = require("./homeRoutes");
// const authController = require("./api/authController");
// const authRoutes = require("./api/authRoutes");
// const recipeController = require("./api/recipeController");
// const recipeRoutes = require("./api/recipeRoutes");

// module.exports = {
//   homeController,
//   homeRoutes,
//   authController,
//   authRoutes,
//   recipeController,
//   recipeRoutes,
// };


const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
