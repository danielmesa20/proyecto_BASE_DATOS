const Sequelize = require('sequelize');
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Pasajero = require('../models/Pasajero');

const Pasaje = db.define('Pasajes', {
    nPasaje:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    clase:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nCedula:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nVuelo:{
        type: Sequelize.INTEGER,
    }
});

//Asociacion tabla Aeropuertos y tabla Pistas
Pasajero.hasMany(Pasaje, {foreignKey: 'nCedula'});
Pasaje.belongsTo(Pasajero, {foreignKey: 'nCedula' }); 

module.exports = Pasaje;