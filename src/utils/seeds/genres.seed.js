const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://music-server:musicserver@cluster0.5n15f.mongodb.net/Project0?retryWrites=true&w=majority";
const GenresSchema = require("../../api/genre/genre.model");

const Genres = [
  {
    name: "Rock",
    description: "Música surgina en EEUU en 1950",
    artist: ["61e06930bbd4274c6af46d19"],
    instrumentation: "Vocalist"
  },
  {
    name: "Jazz",
    description: "Música negra",
    artist: ["61e08029c8c2a394d63d7f9c"],
    instrumentation: "Música instrumental"
  },
  {
    name: "Punk",
    description: "Música basada en la no música",
    artist: ["61e080c3c8c2a394d63d7fa1"],
    instrumentation: "Música instrumental"
  },  
];

const GenresDocuments = Genres.map((genre) => new GenresSchema(genre));

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allGenre = await GenresSchema.find();
    if (allGenre.length) {
      await GenresSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting Genres: ${err}`))
  .then(async () => {
    await GenresSchema.insertMany(GenresDocuments);
    console.log("Genres successfully created");
  })
  .catch((err) => console.log(`Error creating Genres: ${err}`))
  .finally(() => mongoose.disconnect());
