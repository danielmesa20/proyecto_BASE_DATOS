const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Pista = require('../models/Pista');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LAS RUTAS
router.get('/', async  (req, res) =>  {
    let pistas = await Pista.findAll();
    res.render('pista/pistas', {pistas} );
});

module.exports = router;