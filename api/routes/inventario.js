'use strict'

var express = require('express');//Hacemos uso de la librería express
var inventarioController = require('../controllers/inventario');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados

api.get('/inventario/:id', md_auth.ensureAuth, inventarioController.getProduct);
api.post('/save-producto', md_auth.ensureAuth, inventarioController.saveProduct);
api.get('/inventarios/:page?', md_auth.ensureAuth, inventarioController.getProducts);
api.put('/update-inventario/:id', md_auth.ensureAuth, inventarioController.updateInventario);
api.delete('/delete-inventario/:id', md_auth.ensureAuth, inventarioController.deleteProduct);
api.get('/allinventario/', md_auth.ensureAuth, inventarioController.allinventarios);

module.exports = api;
