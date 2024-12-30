const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  meals: {
    breakfast: [{
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      },
      servings: Number
    }],
    lunch: [{
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      },
      servings: Number
    }],
    dinner: [{
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      },
      servings: Number
    }],
    snacks: [{
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      },
      servings: Number
    }]
  },
  nutritionTotals: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  }
}, {
  timestamps: true
});

// Index for efficient querying by user and date
mealPlanSchema.index({ user: 1, date: 1 });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
