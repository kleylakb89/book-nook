// requiring dependencies
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// setting route if it's on Heroku or local
const PORT = process.env.PORT || 3001;

const app = express();

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// creating a session
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// syncing database with app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
});