const Sequelize = require('sequelize');
const db = require('../config/database');
const Ruta = require('../models/Ruta');
const Avion = require('../models/Avion');
const Pasaje = require('../models/Pasaje');

const Vuelo = db.define('Vuelos', {
    numeroVuelo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fechaSalida:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaLlegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaRealLlegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    fechaRealSalida:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    mAvion:{
        type: Sequelize.STRING,
    },
    ruta:{
        type: Sequelize.INTEGER
    }
});

//Asociacion tabla Vuelos y tabla Pasajes
Vuelo.hasMany(Pasaje, {foreignKey: 'nVuelo'});
Pasaje.belongsTo(Vuelo, {foreignKey: 'nVuelo' });

//Asociacion tabla Vuelos y tabla Rutas
Ruta.hasMany(Vuelo, {foreignKey: 'ruta'});
Vuelo.belongsTo(Ruta, {foreignKey: 'ruta' });

module.exports = Vuelo;