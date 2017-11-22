'use strict'

var express = require('express');//Hacemos uso de la librería express
var serviciosController = require('../controllers/servicios');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados
api.get('/servicio/:id', md_auth.ensureAuth, serviciosController.getServicio);
api.post('/save-servicio', md_auth.ensureAuth, serviciosController.saveServicio);
api.get('/servicios/:page?', md_auth.ensureAuth, serviciosController.getServicios);
api.put('/update-servicio/:id', md_auth.ensureAuth, serviciosController.updateServicio);
api.delete('/delete-servicio/:id', md_auth.ensureAuth, serviciosController.deleteServicio);
api.get('/allservicio/', md_auth.ensureAuth, serviciosController.allservicios);

module.exports = api;
