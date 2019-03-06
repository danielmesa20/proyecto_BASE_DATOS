const Sequelize = require('sequelize');
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');

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
    nCedula:{    //Pasajeros
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nVueloP:{    //Vuelos
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

/* Pasaje.hasOne(Vuelo, { foreignKey: 'numeroVuelo' } );   */
module.exports = Pasaje;