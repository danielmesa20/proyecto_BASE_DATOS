const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Avion = require('../models/Avion');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//GET aviones list (localhost:8080/aviones)
router.get('/', (req, res) =>  
    Avion.findAll({
        where:  {
            eliminado: 0
        }
    })
    .then(aviones => res.render('avion/aviones', {
          aviones
      }))
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
    }else{ //Sino hay errores
        
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

//Buscar un avion por su número
router.get('/buscar', (req,res) => res.render('avion/buscar'));  

router.post('/buscar', (req, res) => {

    const { numero_avion } = req.body;

    Avion.findAll(
        { where: {
            numero_avion //numero_avion: numero_avion
        }
    })
    .then(aviones => res.render('avion/aviones', { aviones } ))
    .catch(err => console.log(err));
});

//ELIMINAR AVION
router.get('/delete/:numero_avion', (req,res) =>{

    const { numero_avion } = req.params;  

    const newData = {
        eliminado: 1
    }
         
    Avion.update( newData, { 
        where:{ 
            numero_avion  //numero_avion: numero_avion
        } })
    .then(res.render('avion/aviones'))
    .catch(err => console.log(err));

 });


//Editar avión
router.get('/edit/:numero_avion', (req,res) =>{  // Muestra los datos del avión a editar
    const { numero_avion } = req.params;
    Avion.findAll(
        { where: {
            numero_avion //numero_avion: numero_avion
        }
    })
    .then(aviones => res.render('avion/edit', {avion:aviones[0]}))
    .catch(err => console.log(err));

 });

 router.post('/edit/:numero_avion',(req,res) =>{
    const { numero_avion } = req.params;
    const { modelo, fabricante, velocidad_max} = req.body;
    const newAvion = {
        numero_avion,
        fabricante,
        modelo,
        velocidad_max
    }
    Avion.update( newAvion, { 
        where:{ 
            numero_avion  //numero_avion: numero_avion
        } })
    //req.flash('success', 'Avión actualizado correctamente');
    .then(res.render('avion/aviones'))
    .catch(err => console.log(err));
 });


module.exports = router;
