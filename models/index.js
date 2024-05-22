const User = require('./User')
const Recipes = require('./Recipes')

User.hasMany(Recipes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Recipes.belongsTo(User, {
    foreignKey: 'user_id'
})