'use strict'

var express = require('express');
var inventarioController = require('../controllers/inventario');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/inventario/:id', md_auth.ensureAuth, inventarioController.getProduct);
api.post('/save-producto', md_auth.ensureAuth, inventarioController.saveProduct);
api.get('/inventarios/:page?', md_auth.ensureAuth, inventarioController.getProducts);
api.put('/update-inventario/:id', md_auth.ensureAuth, inventarioController.updateInventario);
api.delete('/delete-inventario/:id', md_auth.ensureAuth, inventarioController.deleteProduct);

module.exports = api;
