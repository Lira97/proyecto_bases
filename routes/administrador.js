'use strict'

var express = require('express');
var administradorController = require('../controllers/administrador');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/administrador/:id', md_auth.ensureAuth, administradorController.getAdministrador);
api.post('/save-administrador', md_auth.ensureAuth, administradorController.saveAdministrador);
api.get('/albums/:user?', md_auth.ensureAuth, administradorController.getAdministradores);
//api.put('/update-administrador/:id', md_auth.ensureAuth, administradorController.updateAdministrador);
//api.delete('/delete-administrador/:id', md_auth.ensureAuth, administradorController.deleteAdministrador);

module.exports = api;
