'use strict'

var express = require('express');
var serviciosController = require('../controllers/servicios');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/servicio/:id', md_auth.ensureAuth, serviciosController.getServicio);
api.post('/save-servicio', md_auth.ensureAuth, serviciosController.saveServicio);
api.get('/servicios/:page?', md_auth.ensureAuth, serviciosController.getServicios);
api.put('/update-servicio/:id', md_auth.ensureAuth, serviciosController.updateServicio);
api.delete('/delete-servicio/:id', md_auth.ensureAuth, serviciosController.deleteServicio);

module.exports = api;
