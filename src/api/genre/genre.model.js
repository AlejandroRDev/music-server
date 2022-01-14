const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    artist: [{ type: Schema.Types.ObjectId, ref: "artists", required: true }],
    instrumentation: [{type: String, required: true}]
}, { timestamp: true }
)

const Genre = mongoose.model('Genres', GenreSchema)
module.exports = Genre