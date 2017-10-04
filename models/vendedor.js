'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendedorSchema = Schema({
   Nclientes: Number,
   user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Vendedor', VendedorSchema);
