'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   id_contrato: String,
   nombreEmpresa: String,
   valor:Number,
   zona: String,
   telefono:Number,
   servicios:String
});

module.exports = mongoose.model('Contratos', UserSchema);
