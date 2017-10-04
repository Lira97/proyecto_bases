'use strict'

var express = require('express');
var vendedorController = require('../controllers/vendedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/vendedor/:id', md_auth.ensureAuth, vendedorController.getVendedor);
api.post('/save-vendedor', md_auth.ensureAuth, vendedorController.saveVendedor);
api.get('/vendedores/:user?', md_auth.ensureAuth, vendedorController.getVendedores);
api.put('/update-vendedor/:id', md_auth.ensureAuth, vendedorController.updateVendedor);
api.delete('/delete-vendedor/:id', md_auth.ensureAuth, vendedorController.deleteVendedor);

module.exports = api;
