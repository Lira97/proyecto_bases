'use strict'

var express = require('express');
var ventaController = require('../controllers/ventas');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/ventas/:id', md_auth.ensureAuth, ventaController.getVenta);
api.post('/save-ventas', md_auth.ensureAuth, ventaController.saveVenta);
api.get('/ventas/:page?', md_auth.ensureAuth, ventaController.getVentas);
api.put('/update-ventas/:id', md_auth.ensureAuth, ventaController.updateVenta);
api.delete('/delete-ventas/:id', md_auth.ensureAuth, ventaController.deleteVenta);

module.exports = api;
