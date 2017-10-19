'use strict'

var express = require('express');//Hacemos uso de la librería express
var ingenieroController = require('../controllers/ingenieros');//Hacemos uso de los controllers creados

var api = express.Router();
var md_auth = require('../middlewares/authenticate');//Hacemos uso de la autentificación creada

//damos la ruta para los diferentes métodos creados

api.get('/ingeniero/:id', md_auth.ensureAuth, ingenieroController.getIngeniero);
api.post('/save-ingeniero', md_auth.ensureAuth, ingenieroController.saveIngeniero);
api.get('/ingenieros/:user?', md_auth.ensureAuth, ingenieroController.getIngenieros);
api.put('/update-ingeniero/:id', md_auth.ensureAuth, ingenieroController.updateIngeniero);
api.delete('/delete-ingeniero/:id', md_auth.ensureAuth, ingenieroController.deleteIngeniero);

module.exports = api;
