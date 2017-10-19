'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el administrador
var AdministradorSchema = Schema({
   user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Administrador', AdministradorSchema);//la exportamos a la base de datos
