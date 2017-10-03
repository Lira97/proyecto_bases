'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngenieroSchema = Schema({
   Nservicios: String,
   User: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ingeniero', IngenieroSchema);
