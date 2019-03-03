const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ruta = require('../models/Ruta');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LAS RUTAS
router.get('/', async  (req, res) =>  {
    let rutas = await Ruta.findAll();
    res.render('ruta/rutas', {rutas} );
});

module.exports = router;