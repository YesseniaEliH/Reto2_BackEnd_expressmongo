// Este modulo es el controlador de nuestra aplicación
var Note = require('../models/note.model.js');

// Crea y guarda una nota en la BD
function create(req, res) {
    if(!req.body.name_book) {
        res.status(400).send({message: "Debe ingresar el nombre del libro"});
    }

    var note = new Note({name_book: req.body.name_book || "Empty", author_book: req.body.author_book || "Empty", date_p: req.body.date_d || "Empty",
                        num_p: req.body.num_p || "Empty", date_d: req.body.date_d || "Empty"});

    note.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Ha ocurrido un error al guardar la nota."});
        } else {
            res.send(data);
        }
    });
};

// Encuentra y retorna todas las notas de la base de datos
function findAll(req, res) {
    Note.find(function(err, lib){
        if(err) {
            res.status(500).send({message: "Ha ocurrido un error al obtener las notas"});
        } else {
            res.send(lib);
        }
    });
};

// Encuentra una nota con el noteId
function findOne(req, res) {
    Note.findById(req.params.noteId, function(err, data) {
        if(err) {
            res.status(500).send({message: "no se ha podido obtener la nota con id " + req.params.noteId});
        } else {
            res.send(data);
        }
    });
};

// Actualiza una nota identificada con el noteId en el request
function update(req, res) {
    Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            res.status(500).send({message: "No se pudo encontrar una nota con id " + req.params.noteId});
        }

        note.name_book = req.body.name_book;
        note.author_book = req.body.author_book;
        note.date_p = req.body.date_p;
        note.num_p = req.body.nun_p;
        note.date_d = req.body.date_d;

        note.save(function(err, data){
            if(err) {
                res.status(500).send({message: "No se pudo actualizar la nota con id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};

// Elimina una nota con el ID noteId especificado en el request
function deleteNote(req, res) {
    Note.remove({_id: req.params.noteId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "No se puede eliminar la nota con id " + req.params.id});
        } else {
            res.send({message: "La nota ha sido eliminada exitosamente"})
        }
    });
};

// Exportamos todas nuestras funciones para que puedan ser usadas
module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteNote
};
