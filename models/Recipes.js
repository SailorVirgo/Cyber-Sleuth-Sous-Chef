const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipes extends Model {}

Recipes.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        directions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        has_nuts: {
            type: DataTypes.BOOLEAN
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipes',
      }
)
module.exports = Recipes