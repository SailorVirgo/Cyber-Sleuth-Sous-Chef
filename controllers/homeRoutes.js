
// ? This file is a Controller. 
// ? It routes commands to the Model and View parts.

const router = require('express').Router();

// ? GET route for getting all of the dishes that are on the menu
router.get('/', async (req, res) => {
  // ? This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render('all');
});

module.exports = router;