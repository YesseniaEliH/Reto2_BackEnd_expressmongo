
var express = require('express');
var bodyParser = require('body-parser');

// Creamos nuestra app de express
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));

// importamos la configuracion de nuestra BD
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {

});

mongoose.connection.on('error', function() {
    console.log('No se ha podido conectar a la BD, Saliendo...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Conectado exitosamente a la BD!");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

var lib = require('./app/controller/note.controller');

// Creamos una nueva nota
app.post('/lib', lib.create);

// Obtenemos todas las notas
app.get('/lib', lib.findAll);

// encuentra una nota con el noteId
app.get('/lib/:noteId', lib.findOne);

// Actualiza una nota con el noteId
app.put('/lib/:noteId', lib.update);

// Elimina una nota con el noteId
app.delete('/lib/:noteId', lib.deleteNote);

app.listen(3000, function() {
  console.log("El servidor web esta corriendo en el puerto 3000...!");
});
