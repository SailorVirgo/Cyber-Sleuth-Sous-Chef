const User = require('./User')
const Recipes = require('./Recipes')
const Ingredients = require('./Ingredients')

User.hasMany(Recipes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Recipes.belongsTo(User, {
    foreignKey: 'user_id'
})

Recipes.hasMany(Ingredients, {
    foreignKey: 'recipes_id'
})

Ingredients.belongsTo(Recipes, {
    foreignKey: 'recipes_id'
})

module.exports = {User, Recipes, Ingredients};