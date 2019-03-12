const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Pasaje = require('../models/Pasaje');
const Pasajero = require('../models/Pasajero');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//VUELOS
router.get('/', async  (req, res) =>  { //INNER JOIN TABLE VUELOS , AVION  Y RUTAS
        let datos = await Vuelo.findAll({
            attributes: ['numeroVuelo', 'fechaSalida', 'fechaLlegada'], //atributos tabla Vuelos
            include: [
                {
                    model: Ruta,
                    attributes: ['destino', 'origen'], //atributos tabla Rutas
                    required:true        
                },
                {
                    model: Avion,
                    attributes: ['cAsientosCE', 'cAsientosPC'], //atributos tabla Aviones 
                    required:true      
                }
            ]
        });
        
        console.log(datos);
        res.render('vuelo/vuelos', {datos} );
});

router.get('/datos/:dato', async  (req, res) =>  {
    const { dato } = req.params;
    let datos = await Pasaje.findAll({              //INNER JOIN table Pasajes y tabla Pasajeros
        attributes: ['nPasaje', 'clase'],           //atributos tabla Pasaje
         where:{ nVuelo: dato },
            include: [{ 
                model: Pasajero,
                attributes: ['nombre', 'direccion'], //atributos tabla Pasajero
                required: true         
            }]   
    });
    console.log(datos);
    res.render('vuelo/datos', {datos} );

});

router.get('/buscar', (req,res) =>  res.render('vuelo/buscar')); 

router.post('/buscar', async  (req, res) =>  {
    const  { origen, destino, dateS, dateL } = req.body;
    let errors = []; // Vector de errores
    if(origen == destino){
        errors.push({text: 'El destino debe ser distinto al origen'})
    }
    if(dateS == dateL){
        errors.push({text: 'La fecha de llegada no puede ser igual a la fecha de salida'})
    }
    if(errors.length>0){
        res.render('vuelo/buscar', {
            errors,
            origen,
            destino
        })
    }else{
        let datos = await Vuelo.findAll({
            where:{ fechaSalida: dateS, fechaLlegada: dateL },
            include: [{ 
                model: Ruta,
                where: { origen: origen, destino: destino },
                required: true
            }]
        }); 
        /* console.log(datos);  */
        if(datos.length>0){
            res.render('vuelo/mostrar', {datos} ); 
        }else{
            errors.push({text: 'No hay vuelos con esas especificaciones! '})
            res.render('vuelo/buscar', {
                errors,
                origen,
                destino
            })
        }
       
    }
});

router.get('/comprar/:dato', async  (req, res) =>  { //Cantidad de asientos disponibles por vuelos
    const { dato } = req.params;
    res.render('vuelo/comprar', { dato });
});

module.exports = router;