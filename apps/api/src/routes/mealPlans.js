const express = require('express');
const { body, query } = require('express-validator');
const mealPlanController = require('../controllers/mealPlanController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const mealPlanValidation = [
  body('date').isISO8601().toDate(),
  body('meals').isObject()
];

const dateRangeValidation = [
  query('startDate').isISO8601().toDate(),
  query('endDate').isISO8601().toDate()
];

// Routes
router.use(auth); // Protect all meal plan routes

router.post('/', mealPlanValidation, mealPlanController.createMealPlan);
router.get('/', dateRangeValidation, mealPlanController.getMealPlans);
router.get('/:id', mealPlanController.getMealPlan);
router.put('/:id', mealPlanValidation, mealPlanController.updateMealPlan);
router.delete('/:id', mealPlanController.deleteMealPlan);

module.exports = router;
