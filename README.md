# Recipe Book

The Recipe Book Application is a full-stack web application designed to allow users to create, manage, and share their favorite recipes. Users can register and log in to their accounts, view a list of recipes, add new recipes, and update existing ones. The aplication utilizes Node.js, Express, PostgreSQL, Sequelize ORM, and Handlebars.js for the front-end rendering. Passport.js is used for authentication.

## Table of Contents

- Installation
- Usage
- Features
- Technologies Used
- Project Scructure
- Contributing
- License

## Installation

Prerequisites

- Node.js
- PostgreSQL

Steps

1. Clone the repository

```bash
git clone https://github.com/SailorVirgo/Project-2.git
cd recipe-book
```

2. Install dependencies

```bash
npm install
```

3. Set up the database

- Create a PostgreSQL database named `recipe_db`.

```bash
CREATE DATABASE recipe_db;
```

- Update the `.env` file with your database credentials.

```bash
DB_NAME=recipes_db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
```

4. Run the database

```bash
psql -U postgres
\i schema.sql;
```

5. Seed the database

```bash
node seeeds/seeds.js
```

6. Start the application

```bash
npm start
```

The application should now be running on `http://localhost:3001`.

## Usage

- Navigate to `http://localhost:3001` to view the home page.
- Register a new user account or log in with an existing account.
- View, add, and update recipes.

## Features

- User authentication (register, log in, log out)
- Add, view, and update recipes
- Upload recipe images
- Responsive and interactive UI

# Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequilize ORM
- Handlebars.js
- Passport.js
- Multer (for uploads)
- dotenv ( for environment variables)

## Project Structure

```bash
project-root/
├── config/
│   ├── connection.js             # Database connection settings
│   └── passport.js               # Passport configuration
├── controllers/
│   ├── api/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── recipeRoutes.js       # Recipe-related routes
│   │   └── index.js              # Combines all API routes
│   ├── homeRoutes.js             # Home and dashboard routes
│   └── index.js                  # Main router
├── models/
│   ├── index.js                  # Model associations
│   ├── ingredients.js            # Ingredient model
│   ├── recipes.js                # Recipe model
│   └── user.js                   # User model
├── public/
│   ├── css/                      # Stylesheets
│   └── uploads/                  # Uploaded recipe images
├── utils/
│   ├── auth.js                   # Authentication utility functions
│   └── helpers.js                # Helper functions
├── views/
│   ├── layouts/
│   │   └── main.handlebars       # Main layout file
│   ├── home.handlebars           # Home view
│   ├── login.handlebars          # Login view
│   ├── register.handlebars       # Registration view
│   └── dashboard.handlebars      # Dashboard view
├── .env                          # Environment variables
├── server.js                     # Main application file
└── package.json                  # Project metadata and dependencies
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under MIT License.
