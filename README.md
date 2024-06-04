# Recipe Book Application

## Overview

The Recipe Book Application is a full-stack web application that allows users to create, view, and manage their favorite recipes. Users can register, log in, upload images for their recipes, and share their culinary creations. The application is built using Node.js, Express.js, Handlebars.js, and PostgreSQL, and it is deployed on Render.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Recipe Management**: Users can create, update, and delete recipes.
- **Image Uploads**: Users can upload images for their recipes.
- **View Recipes**: Users can view their own recipes and those shared by others.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Frontend**: Handlebars.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js
- **Deployment**: Render

## Project Structure

```bash
.
├── config
│   ├── connections.js
│   ├── passport.js
├── controllers
│   ├── api
│   │   ├── authRouter.js
│   │   ├── index.js
│   │   ├── recipeRouter.js
│   ├── homeRouter.js
│   ├── index.js
├── db
│   ├── schema.sql
├── models
│   ├── index.js
│   ├── Ingredients.js
│   ├── Recipes.js
│   ├── User.js
├── public
│   ├── css
│   │   ├── index.css
│   │   ├── jass.css
│   │   ├── styles.css
│   ├── js
│   │   ├── login.js
│   │   ├── logout.js
│   │   ├── main.js
│   │   ├── post.js
│   │   ├── register.js
│   ├── uploads
├── seeds
│   ├── ingredientSeedFile.json
│   ├── recipeSeedData.json
│   ├── seeds.js
│   ├── userSeedData.json
├── utils
│   ├── auth.js
│   ├── helpers.js
├── views
│   ├── layouts
│   │   ├── main.handlebars
│   ├── dashboard.handlebars
│   ├── home.handlebars
│   ├── login.handlebars
│   ├── register.handlebars
│   ├── recipe.handlebars
├── .env
├── package.json
├── README.md
├── server.js
```

## Seed Data

The application includes seed data to populate the database with initial information:

**ingredientSeedFile.json**: Contains initial data for ingredients.
**recipeSeedData.json**: Contains initial data for recipes.
**userSeedData.json**: Contains initial data for users.
**seeds.js**: Script to load the data from the JSON files into the database.

## Deployment

The Recipe Book Application is deployed on Render, ensuring it is always available and scalable to handle user traffic.

## How to Use

**Register an Account**: Create an account to start using the application.
**Log In**: Log in with your credentials.
**Create Recipes**: Add new recipes by providing details such as name, description, instructions, and an image.
**View Recipes**: Browse through your recipes and those shared by other users.
**Edit Recipes**: Update or delete your recipes as needed.

## License

This project is licensed under the MIT License.
