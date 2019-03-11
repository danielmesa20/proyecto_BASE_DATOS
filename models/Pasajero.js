const Sequelize = require('sequelize');
const db = require('../config/database');
const Pasaje = require('../models/Pasaje');

const Pasajero = db.define('Pasajeros', {
    cedula:{
        type: Sequelize.INTEGER,
        primarykey: true,
        allowNull: false
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false    
    },
    pasaporte:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    direccion:{
        type: Sequelize.STRING,
        allowNull: false
    }
});



module.exports = Pasajero;