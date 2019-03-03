const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS VUELOS
router.get('/', async  (req, res) =>  {
    let vuelos = await Vuelo.findAll();
    res.render('vuelo/vuelos', {vuelos} );
});

router.get('/buscarVCA', async  (req, res) =>  {

    let vuelos = await Vuelo.findAll({
        where: {
            numero_avion:{
                [Op.ne]: null
            }
        } 
    });
    res.render('vuelo/vuelos', {vuelos} );

});

router.get('/buscarVSA', async  (req, res) =>  {

    let vuelos = await Vuelo.findAll({
        where: {
            numero_avion: null,
        } 
    });
    res.render('vuelo/vuelos', {vuelos} );

});



module.exports = router;