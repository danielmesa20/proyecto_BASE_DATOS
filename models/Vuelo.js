const Sequelize = require('sequelize');
const db = require('../config/database');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Pasaje = require('../models/Pasaje');

const Vuelo = db.define('Vuelos', {
    numeroVuelo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaSalida:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaLlegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    mAvion:{
        type: Sequelize.STRING
    },
    nRuta:{
        type: Sequelize.INTEGER,
        references: {
            model: Ruta,
            key: "nRuta"
        }
    }
});

Vuelo.hasMany(Pasaje, { foreignKey: 'nVueloP' } ); 
/* Vuelo.hasOne(Ruta, { foreignKey: 'nRuta' } ); */
module.exports = Vuelo;