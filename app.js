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
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);

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
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store
  })
);
store.sync();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Handlebars
app.engine('handlebars', exphbs ({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
}));

app.set('view engine', 'handlebars');

/* // Body Parser
app.use(bodyParser.urlencoded({ extended: true })); */

app.use(express.urlencoded({extended: true}));

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  next();
});

//Index routes
app.get('/', (req,res) => res.render('auth/login', {layout: 'main' })); 

//Routes Aviones
app.use('/aviones', require('./routes/aviones'));

//Routes autenticacion
app.use('/auth', require('./routes/auths'));

//Routes vuelos
app.use('/vuelos', require('./routes/vuelos'));

//Routes rutas
app.use('/rutas', require('./routes/rutas'));

//Routes aeropuestos
app.use('/aeropuertos', require('./routes/aeropuertos'));

//Routes Pasajes
app.use('/pasajes', require('./routes/pasajes'));

//Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Servidor comenzo en el puerto ${PORT}`));
