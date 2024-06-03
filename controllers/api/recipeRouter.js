const express = require("express");
const multer = require("multer");
const path = require("path");
const { Recipes, Ingredients } = require("../../models");
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("recipeImage");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipes.findAll({
      where: { user_id: req.user.id },
      include: [Ingredients],
    });
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recipes", error });
  }
});

// Create a new recipe
router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err });
    }

    const { name, description, instructions, has_nuts } = req.body;

    try {
      await Recipes.create({
        name,
        description,
        date_created: new Date(),
        instructions: instructions.split("\n"),
        has_nuts: has_nuts === "true",
        user_id: req.user.id,
        imagePath: req.file ? `/uploads/${req.file.filename}` : null,
      });
      res.status(201).json({ message: "Recipe created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create recipe", error });
    }
  });
});

// Update a recipe
router.post("/update", async (req, res) => {
  const { recipeId, rating } = req.body;

  try {
    const recipe = await Recipes.findByPk(recipeId);
    if (recipe) {
      recipe.rating = rating;
      await recipe.save();
      res.status(200).json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe", error });
  }
});

module.exports = router;
