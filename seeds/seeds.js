const sequelize = require('../config/connections.js');
const { Recipes, User, Ingredients } = require('../models')

//importing .json files to be able to access on this page
const recipeSeedData = require('./recipeSeedData.json');
const userSeedData = require('./userSeedData.json');
const ingredientSeedData = require('./ingredientSeedFile.json');

//injecting all .json files into the database in order(User, Recipes, Ingredients)
const seedUserDatabase = async () => {
    await sequelize.sync({force: true});

for (const user of userSeedData){
    await User.create(user);
};

await Recipes.bulkCreate(recipeSeedData);

for (const ingredient of ingredientSeedData){
    await Ingredients.create(ingredient);
};
}

seedUserDatabase();

