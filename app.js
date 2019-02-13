const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config({ path: "./variables.env" }); 

// Database
const db = require('./config/database.js');

//Test DB
db.authenticate()
    .then(() => console.log('Base de Datos conectada...'))
    .catch(err => console.log(err))

const app = express();

//Handlebars
app.engine('handlebars', exphbs ({ 
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Index route
app.get('/', (req,res) => res.render('paginaPrincipal', {layout: 'landing'}));

//Routes Aviones
app.use('/aviones', require('./routes/aviones'));

const PORT = process.env.PORT || 8080;

app.listen(PORT,console.log(`Servidor comenzo en el puerto ${PORT}`));