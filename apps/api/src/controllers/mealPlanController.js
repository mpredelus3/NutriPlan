const MealPlan = require('../models/MealPlan');

// Create meal plan
exports.createMealPlan = async (req, res) => {
  try {
    const mealPlan = new MealPlan({
      ...req.body,
      user: req.userId
    });
    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meal plan', error: error.message });
  }
};

// Get meal plans for a date range
exports.getMealPlans = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      user: req.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    const mealPlans = await MealPlan.find(query)
      .populate({
        path: 'meals.breakfast.recipe meals.lunch.recipe meals.dinner.recipe meals.snacks.recipe',
        select: 'name nutritionInfo prepTime'
      })
      .sort({ date: 1 });

    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal plans', error: error.message });
  }
};

// Get single meal plan
exports.getMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({
      _id: req.params.id,
      user: req.userId
    }).populate({
      path: 'meals.breakfast.recipe meals.lunch.recipe meals.dinner.recipe meals.snacks.recipe',
      select: 'name nutritionInfo prepTime ingredients'
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal plan', error: error.message });
  }
};

// Update meal plan
exports.updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    Object.assign(mealPlan, req.body);
    await mealPlan.save();
    
    const updatedMealPlan = await MealPlan.findById(mealPlan._id)
      .populate({
        path: 'meals.breakfast.recipe meals.lunch.recipe meals.dinner.recipe meals.snacks.recipe',
        select: 'name nutritionInfo prepTime ingredients'
      });

    res.json(updatedMealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal plan', error: error.message });
  }
};

// Delete meal plan
exports.deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal plan', error: error.message });
  }
};
