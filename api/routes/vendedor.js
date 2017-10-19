'use strict'

var express = require('express');//Hacemos uso de la librería express
var vendedorController = require('../controllers/vendedor');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados

api.get('/vendedor/:id', md_auth.ensureAuth, vendedorController.getVendedor);
api.post('/save-vendedor', md_auth.ensureAuth, vendedorController.saveVendedor);
api.get('/vendedores/:user?', md_auth.ensureAuth, vendedorController.getVendedores);
api.put('/update-vendedor/:id', md_auth.ensureAuth, vendedorController.updateVendedor);
api.delete('/delete-vendedor/:id', md_auth.ensureAuth, vendedorController.deleteVendedor);

module.exports = api;
