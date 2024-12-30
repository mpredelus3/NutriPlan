const Recipe = require('../models/Recipe');

// Create new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      creator: req.userId
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};

// Get all recipes (with pagination and filters)
exports.getRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tags } = req.query;
    const query = {};

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Add tags filter
    if (tags) {
      query.tags = { $all: tags.split(',') };
    }

    const recipes = await Recipe.find(query)
      .populate('creator', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Recipe.countDocuments(query);

    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

// Get single recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('creator', 'name');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, creator: req.userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, creator: req.userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
