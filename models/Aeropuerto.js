const Sequelize = require('sequelize');
const db = require('../config/database');
const Pista = require('../models/Pista');
const

const Aeropuerto = db.define('Aeropuertos', {
    IATA:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pais:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    ciudad:{
        type: Sequelize.STRING,
        allowNull: false 
    }
});


module.exports = Aeropuerto;