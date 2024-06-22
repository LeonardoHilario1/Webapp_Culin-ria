const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

// Listar receitas
exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('recipes', { recipes });
};

// Obter uma receita específica e seus comentários
exports.getRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id, {
    include: [{ model: Comment, as: 'comments' }]
  });
  res.render('recipeDetail', { recipe, comments: recipe.comments });
};

// Adicionar uma nova receita
exports.postAddRecipe = async (req, res) => {
  const { title, ingredients } = req.body;
  await Recipe.create({ title, ingredients });
  res.redirect('/recipes');
};

// Adicionar um comentário a uma receita
exports.postAddComment = async (req, res) => {
  const { content } = req.body;
  await Comment.create({ content, RecipeId: req.params.id });
  res.redirect(`/recipes/${req.params.id}`);
};

// Exibir página de edição de receita
exports.getEditRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  res.render('editRecipe', { recipe });
};

// Editar uma receita
exports.postEditRecipe = async (req, res) => {
  const { title, ingredients } = req.body;
  await Recipe.update({ title, ingredients }, {
    where: { id: req.params.id }
  });
  res.redirect(`/recipes/${req.params.id}`);
};

// Excluir uma receita
exports.postDeleteRecipe = async (req, res) => {
  await Recipe.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/recipes');
};
