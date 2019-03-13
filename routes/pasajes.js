const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll();
    console.log(aeropuertos);
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
}); 


module.exports = router;