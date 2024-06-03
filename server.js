const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connections");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const store = new SequelizeStore({
  db: sequelize,
});

const sess = {
  secret: "secret password",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
  saveUninitialized: true,
  store: store,
};

// Middleware
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Routes
app.use(routes);

// Sync and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
