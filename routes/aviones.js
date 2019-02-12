const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Avion = require('../models/Avion');

//GET aviones list (localhost:8080/aviones)
router.get('/', (req, res) =>  
    Avion.findAll()
    .then(aviones => {
      res.render('avion/aviones',{
          aviones
      })
    })
    .catch(err => console.log(err)));


//Mostrar un form para añadir un avión
router.get('/add', (req,res) => res.render('avion/add'));  

// Add un avion
router.post('/add',(req,res) =>{    
    
    let { numero_avion, fabricante, modelo, velocidad_max} = req.body;
    let errors = [];

    //VERIFICAR SI UN CAMPO ESTA VACIO
    if(!numero_avion){
        errors.push({text: 'Por favor ingresa el número de avión'})
    }

    if(!fabricante){
        errors.push({text: 'Por favor ingresa el fabricante'})
    }

    if(!modelo){
        errors.push({text: 'Por favor ingresa el modelo del avión'})
    }

    if(!velocidad_max || velocidad_max<=0){
        errors.push({text: 'Por favor ingresa la velocidad máxima del avión'})
    }

    //Check for errores
    if(errors.length>0){
        res.render('avion/add', {
            errors,
            numero_avion,
            fabricante,
            modelo,
            velocidad_max
        })
    }else{
        
        //Insert into table
        Avion.create({
            numero_avion,
            fabricante,
            modelo,
            velocidad_max
        })
        .then(avion => res.redirect('/aviones'))        
        .catch(err => console.log(err));
    }
});

module.exports = router;
