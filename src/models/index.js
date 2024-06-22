const sequelize = require('../db');
const Recipe = require('./recipe');
const Comment = require('./comment');

// Definir associações
Recipe.hasMany(Comment, { foreignKey: 'RecipeId', as: 'comments' });
Comment.belongsTo(Recipe, { foreignKey: 'RecipeId', as: 'recipe' });

const db = {
  sequelize,
  Recipe,
  Comment
};

module.exports = db;
