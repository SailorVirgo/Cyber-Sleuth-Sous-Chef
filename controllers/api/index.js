const router = require('express').Router();

const userRoutes = require('./authRoutes');
const recipeRoute = require('./recipeRoutes'); 

router.use('/user', userRoutes);
router.use('/recipe', recipeRoute);

module.exports = router;
