const Sequelize = require('sequelize');
const db = require('../config/database');
const Telefono = require('../models/Telefono');

const Pasajero = db.define('Pasajeros', {
    cedula:{
        type: Sequelize.INTEGER,
        primaryKey:true,
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

//Asociacion tabla Pasajeros y tabla Telefonoss (Probar)
Pasajero.hasMany(Telefono, {foreignKey: 'nCedula'});
Telefono.belongsTo(Pasajero, {foreignKey: 'nCedula' });

module.exports = Pasajero;