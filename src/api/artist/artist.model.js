// Eneste apartado defenimos el esquema del artista incluyendo sus "categorías"
// Requerimos dependcencias 
const mongoose = require('mongoose') 

// Declaramos el esquema de los artistas que

const artistSchema = new mongoose.Schema({
    name:{ type: String, require: true, trim: true},
    img:{type: String, trim: true},
    nationality:{ type: String},
    genre:{ type: String},
    songs: [{type: String, require: true }],
    instrument: [{ type: String }],
    ageOfBirth: { type:Number }
})

// Declaramos la variable y la exportamos 

const Artist = mongoose.model('artists',artistSchema)
module.exports = Artist


