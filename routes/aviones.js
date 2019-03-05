const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Avion = require('../models/Avion');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//GET aviones list (localhost:8080/aviones)

//Mostrar todos los aviones
router.get('/', async  (req, res) =>  {

    let aviones = await Avion.findAll({
        where:  {
            eliminado: 0
        }
    });
        
    res.render('avion/aviones', {aviones} );
});

//Mostrar un form para añadir un avión
router.get('/add', (req,res) => res.render('avion/add'));  

// Add un avion
router.post('/add', async (req,res) =>  {     
    
    let { numero_avion, fabricante, modelo, velocidad_max} = req.body;
    let errors = []; // Vector de errores

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
        
        const avion = await Avion.build({   //Insert into table
            numero_avion,
            fabricante,
            modelo,
            velocidad_max
        });

        await avion.save();
        return res.redirect('/aviones');
    }
});

//Buscar un avion por su número
router.get('/buscar', (req,res) =>  res.render('avion/buscar'));  

router.post('/buscar', async (req, res) => {

    const  { numero_avion } = req.body;
    let aviones = await Avion.findAll({ where: { 
        numero_avion,
        eliminado:0
     } });

    if(aviones){
        res.render('avion/buscarA', { aviones } );
    }
});

//Mostrar datos del avión buscado
router.get('/buscarA', (req,res) =>  res.render('avion/buscarA'));   


//ELIMINAR AVION
router.get('/delete/:numero_avion', (req,res) =>{

    const { numero_avion } = req.params;  

    const newData = {
        eliminado: 1
    }
   
    Avion.update( newData, { 
        where:{ 
            numero_avion  //numero_avion: numero_avion
        } 
    })
    .then(avion => res.redirect('/aviones'))  
    .catch(err => console.log(err));

 });


//Editar avión
router.get('/edit/:matriculaAvion', (req,res) =>{  // Muestra los datos del avión a editar
    const { matriculaAvion } = req.params;
    Avion.findAll(
        { where: {
            matriculaAvion //numero_avion: numero_avion
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
    .then(avion => res.redirect('/aviones'))
    .catch(err => console.log(err));
 });

module.exports = router;
