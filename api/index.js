'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose

var app = require('./app');
var port = process.env.PORT || 3977;//definimos el puesto que queramos usar para levantar el servidor


mongoose.Promise = global.Promise;//conectamos la base de datos
//'mongodb://IEEEinventorio:CFIen831lm+@ds147044.mlab.com:47044/emaily-dev'
mongoose.connect('mongodb://localhost:27017/mean-stack-registration-login-example', { useMongoClient: true }, (err, res) => {
    if(err) {
        throw err;//si al conexión es fallida nos regresa un error
    } else {
        console.log('La conexion a la base de datos esta funcionando correctamente...');//si la conexión es correcta nos despliega un mensaje diciéndonos que la conexión fue correcta
        app.listen(port, function() {
            console.log('Servidor del api rest de inventario IEEE http://localhost:'+port);
        });
    }
});
