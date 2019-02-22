const express = require('express');
const router = express.Router();
const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const passport = require('passport');

router.get('/login', (req, res) => res.render('auth/login'));

router.get('/register', (req, res) => res.render('auth/register'))

router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    let errors = [];

    // Buscar errores
    if(!email || !password || !password2){
        errors.push({text: 'Por favor rellene todos los campos'});
    }
    if(password != password2){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    // Verificar longuitud contraseña
    if(password.length < 6){
        errors.push({text: 'La contraseña debe tener al menos 6 caracteres'});
    }

    if(errors.length>0){ //Verificar si hay errores
        res.render('auth/register', {
            errors,
            email,
            password,
            password2
        })
    }else{ //Sino hay errores
        Auth.findOne(
            { where: {
                email
            }
        })
        .then(auth => {
            if(auth){ //Si ya hay una persona registrada con ese email
                errors.push({text: 'Este email ya está registrado'});
                res.render('auth/register', {
                    errors,
                    email,
                    password,
                    password2
            });
            }else{
                
                const newEmpleado = new Auth({
                    email,
                    password
                });
                
                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newEmpleado.password, salt, (err, hash) => {
                    if(err) throw err;
                    newEmpleado.password = hash;
                    //Save empleado
                    Auth.create({
                        email,
                        password: hash
                    })
                    .then(auth => res.render('auth/login'))        
                    .catch(err => console.log(err));
                })) 
            }
        });
    }

});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: 'paginaPrincipal',
        failureRedirect: '/login'
    })(req, res, next);
});

module.exports = router;