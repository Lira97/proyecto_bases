'use strict'

var express = require('express');
var ingenieroController = require('../controllers/ingenieros');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/artists' });

api.get('/ingeniero/:id', md_auth.ensureAuth, ingenieroController.getIngeniero);
api.post('/save-ingeniero', md_auth.ensureAuth, ingenieroController.saveIngeniero);
api.get('/ingenieros/:user?', md_auth.ensureAuth, ingenieroController.getIngenieros);
api.put('/update-ingeniero/:id', md_auth.ensureAuth, ingenieroController.updateIngeniero);
api.delete('/delete-ingeniero/:id', md_auth.ensureAuth, ingenieroController.deleteIngeniero);

module.exports = api;
