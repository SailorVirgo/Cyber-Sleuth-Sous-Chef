const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const passport = require('passport');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const store = new SequelizeStore({
    db: sequelize
})

const sess = {
    secret: 'secret password',
    cookies: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: true,
    store: store
};
//passport middleware
app.use(session(sess));
app.use(passport.initialize());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});