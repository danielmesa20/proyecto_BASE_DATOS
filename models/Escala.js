const Sequelize = require('sequelize');
const db = require('../config/database');
const Ruta = require('../models/Ruta');

const Escala = db.define('Escalas', {
    nEscala:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    pais:{
        type: Sequelize.STRING,
        allowNull:false
    },
    ciudad:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    ruta:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

//Asociacion tabla Rutas y tabla Escalas
Ruta.hasMany(Escala, {foreignKey: 'ruta'});
Escala.belongsTo(Ruta, {foreignKey: 'ruta' }); 

module.exports = Escala;