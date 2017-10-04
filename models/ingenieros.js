'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngenieroSchema = Schema({
   Nservicios: String,
   user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ingeniero', IngenieroSchema);
