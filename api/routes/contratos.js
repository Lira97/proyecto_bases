'use strict'

var express = require('express');//Hacemos uso de la librería express
var contratoController = require('../controllers/contratos');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados

api.get('/contrato/:id', md_auth.ensureAuth, contratoController.getContrato);
api.post('/save-contrato', md_auth.ensureAuth, contratoController.saveContrato);
api.get('/contratos/:page?', md_auth.ensureAuth, contratoController.getContratos);
api.put('/update-contrato/:id', md_auth.ensureAuth, contratoController.updateContrato);
api.delete('/delete-contrato/:id', md_auth.ensureAuth, contratoController.deleteContrato);

module.exports = api;
