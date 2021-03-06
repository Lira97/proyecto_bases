'use strict'

var express = require('express');//Hacemos uso de la librería express
var UserController = require('../controllers/user');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados

api.post('/register', UserController.saveUser);
api.get('/usuarios/:page?', md_auth.ensureAuth, UserController.getUsuario);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.delete('/delete-user/:id', md_auth.ensureAuth, UserController.deleteUsuario);

module.exports = api;
