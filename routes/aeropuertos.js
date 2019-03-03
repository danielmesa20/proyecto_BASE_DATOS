const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');
const Pista = require('../models/Pista');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS AEROPUERTOS
router.get('/', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll();
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
});

router.get('/pistas', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll({
        include: [
            {
                model: Pista,
                where: { IATA: Sequelize.col('Aeropuerto.IATA') }
            }
        ]
    });
    console.log(aeropuertos);
});

module.exports = router;