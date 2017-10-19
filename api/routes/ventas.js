'use strict'

var express = require('express');//Hacemos uso de la librería express
var ventaController = require('../controllers/ventas');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada
var multipart = require('connect-multiparty');
//damos la ruta para los diferentes métodos creados
api.get('/ventas/:id', md_auth.ensureAuth, ventaController.getVenta);
api.post('/save-ventas', md_auth.ensureAuth, ventaController.saveVenta);
api.get('/ventas/:page?', md_auth.ensureAuth, ventaController.getVentas);
api.put('/update-ventas/:id', md_auth.ensureAuth, ventaController.updateVenta);
api.delete('/delete-ventas/:id', md_auth.ensureAuth, ventaController.deleteVenta);

module.exports = api;
