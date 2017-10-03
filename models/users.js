'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   id_empleado: String,
   nombre: String,
   email: String,
   password: String,
   sueldo:Number,
   role: String,
   telefono:Number,
   seguro:Number,
   age:Number
});

module.exports = mongoose.model('User', UserSchema);
