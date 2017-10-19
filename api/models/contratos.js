'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el contrato
var UserSchema = Schema({
   id_contrato: String,
   nombreEmpresa: String,
   valor:Number,
   zona: String,
   telefono:Number,
   servicios:String
});

module.exports = mongoose.model('Contratos', UserSchema);//la exportamos a la base de datos
