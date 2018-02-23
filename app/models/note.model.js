var mongoose = require('mongoose');

// Creamos un schema que guardará en nuestra BD
// la siguiente estructura:
var NoteSchema = mongoose.Schema({
    name_book: String,
    author_book: String,
    date_p: String,
    num_p: String,
    date_d: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
