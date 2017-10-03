'use strict'

var express = require('express');
var contratoController = require('../controllers/contratos');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/contrato/:id', md_auth.ensureAuth, contratoController.getContrato);
api.post('/save-contrato', md_auth.ensureAuth, contratoController.saveContrato);
api.get('/contratos/:page?', md_auth.ensureAuth, contratoController.getContratos);
api.put('/update-contrato/:id', md_auth.ensureAuth, contratoController.updateContrato);
api.delete('/delete-contrato/:id', md_auth.ensureAuth, contratoController.deleteContrato);

module.exports = api;
