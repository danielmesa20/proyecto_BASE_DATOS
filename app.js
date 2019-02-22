const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config({ path: "./variables.env" }); 
const session = require('express-session');
const passport = require('passport');
var Store = require('express-session').Store; 
const database = require('./config/database'); // Database Config
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//iniciamos express
const app = express();

// Passport Config
require('./config/passport')(passport);


//Test DB
database.authenticate()
    .then(value => database.sync())
    .then(value => value)
    .catch(err => {
      console.error(`→ ${err.message}`);
    });

//Middlewares
const store = new SequelizeStore({
  db: database,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store
  })
);
store.sync();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine('handlebars', exphbs ({ 
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
}));

app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended:true }));

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Global variables
app.use(function(req, res, next) {
  app.locals.user = req.user;
  next();
});

//Index routes
app.get('/', (req,res) => res.render('auth/login', {layout: 'main' })); 

//Routes Aviones
app.use('/aviones', require('./routes/aviones'));

//Routes autenticacion
app.use('/auth', require('./routes/auths'));

//Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Servidor comenzo en el puerto ${PORT}`));