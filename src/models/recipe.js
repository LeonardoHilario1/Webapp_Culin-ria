const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Comment = require('./comment');

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Recipe.hasMany(Comment, { as: 'comments', foreignKey: 'RecipeId' });
Comment.belongsTo(Recipe, { foreignKey: 'RecipeId' });

module.exports = Recipe;


