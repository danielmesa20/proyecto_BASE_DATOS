const Sequelize = require('sequelize');
const db = require('../config/database');
const Pasaje = require('../models/Pasaje');
const AvionRuta = require('../models/AvionRuta');

const Vuelo = db.define('Vuelos', {
    numeroVuelo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true,
    },
    fechaSalida:{
        type: Sequelize.DATEONLY,
        allowNull:false 
    },
    fechaLlegada:{
        type: Sequelize.DATEONLY,
        allowNull:false 
    },
    fechaRealLlegada:{
        type: Sequelize.DATEONLY,
        allowNull: true 
    },
    fechaRealSalida:{
        type: Sequelize.DATEONLY,
        allowNull: true 
    },
    avionRuta:{
        type: Sequelize.INTEGER,
    },
});

//Asociacion tabla Vuelos y tabla Pasajes
Vuelo.hasMany(Pasaje, {foreignKey: 'nVuelo'});
Pasaje.belongsTo(Vuelo, {foreignKey: 'nVuelo' });

//Asociacion tabla Vuelos y tabla AvionesRutas
Vuelo.hasOne(AvionRuta, {foreignKey: 'id'});
AvionRuta.belongsTo(Vuelo, {foreignKey: 'id'});

module.exports = Vuelo;