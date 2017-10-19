'use strict'

var express = require('express');//Hacemos uso de la librería express
var administradorController = require('../controllers/administrador');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada


//damos la ruta para los diferentes métodos creados
api.get('/administrador/:id', md_auth.ensureAuth, administradorController.getAdministrador);
api.post('/save-administrador', md_auth.ensureAuth, administradorController.saveAdministrador);
api.get('/albums/:user?', md_auth.ensureAuth, administradorController.getAdministradores);
api.put('/update-administrador/:id', md_auth.ensureAuth, administradorController.updateAdministrador);
api.delete('/delete-administrador/:id', md_auth.ensureAuth, administradorController.deleteAdministrador);

module.exports = api;
