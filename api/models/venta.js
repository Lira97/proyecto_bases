'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   Nventa: Number,
   monto:Number,
   nombreVendedor:{type:Schema.ObjectId,ref:'User'},
   comision:Number,
   cliente:String,
   fecha:String,
   tipo:String,
});

module.exports = mongoose.model('venta', UserSchema);
