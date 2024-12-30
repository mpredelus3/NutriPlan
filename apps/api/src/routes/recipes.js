const express = require('express');
const { body } = require('express-validator');
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const recipeValidation = [
  body('name').trim().notEmpty(),
  body('ingredients').isArray({ min: 1 }),
  body('instructions').isArray({ min: 1 }),
  body('servings').isInt({ min: 1 })
];

// Routes
router.use(auth); // Protect all recipe routes

router.post('/', recipeValidation, recipeController.createRecipe);
router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipe);
router.put('/:id', recipeValidation, recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
