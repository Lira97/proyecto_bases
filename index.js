'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://IEEEinventorio:CFIen831lm+@ds147044.mlab.com:47044/emaily-dev', { useMongoClient: true }, (err, res) => {
    if(err) {
        throw err;
    }else {
        console.log('La conexion a la base de datos esta funcionando correctamente...');

        app.listen(port, function() {
            console.log('Servidor del api rest de musica escuchando en http://localhost:'+port);
        });
    }
});
