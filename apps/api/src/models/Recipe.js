const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    step: Number,
    text: String
  }],
  nutritionInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number
  },
  prepTime: Number, // in minutes
  cookTime: Number, // in minutes
  servings: Number,
  tags: [String],
  image: String
}, {
  timestamps: true
});

// Add text index for search functionality
recipeSchema.index({ name: 'text', description: 'text', 'ingredients.name': 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
