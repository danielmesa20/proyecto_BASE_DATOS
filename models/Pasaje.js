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
    nVuelo:{   
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Pasaje.belongsTo(Vuelo, {foreignKey: 'nVuelo'});

module.exports = Pasaje;