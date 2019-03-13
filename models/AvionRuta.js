const Sequelize = require('sequelize');
const db = require('../config/database');
const Ruta = require('../models/Ruta');

const AvionRuta = db.define('AvionesRutas', {
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    mAvion:{
        type: Sequelize.STRING
    },
    ruta:{
        type: Sequelize.INTEGER,
    }
});

Ruta.hasMany(AvionRuta, {foreignKey: 'ruta'});
AvionRuta.belongsTo(Ruta, {foreignKey: 'ruta' });

module.exports = AvionRuta;