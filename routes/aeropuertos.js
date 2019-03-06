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

router.get('/pistas/:IATA', async  (req, res) =>  { //buscar las pistas de un aeropuerto
    const { IATA } = req.params;
    let aeropuertos = await Aeropuerto.findAll({
        attributes: ['IATA', 'nombre'],                     //datos a traer de la tabla Aeropuertos
        where: {IATA: IATA},
        include: [{ 
            model: Pista,
            attributes: ['id', 'distPista'],                //datos a traer de la tabla pistas
            where: { AeropuertoIATA: { [Op.ne]: null }}     //INNER JOIN TABLE AEROPUERTO Y PISTAS
        }]
    });
    console.log(aeropuertos);
    res.render('aeropuerto/aeropuertos-pistas', {aeropuertos} );
});

module.exports = router;