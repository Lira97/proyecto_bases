'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   Nserie: Number,
   modelo: String,
   cantidad:Number,
   serie:String,
   capacidad:Number,
});

module.exports = mongoose.model('inventario', UserSchema);
