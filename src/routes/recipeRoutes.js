const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Rotas para receitas
router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes', recipeController.postAddRecipe);
router.post('/recipes/:id/comments', recipeController.postAddComment); 
router.get('/recipes/:id/edit', recipeController.getEditRecipe); 
router.post('/recipes/:id/edit', recipeController.postEditRecipe); 
router.post('/recipes/:id/delete', recipeController.postDeleteRecipe); 

module.exports = router;
