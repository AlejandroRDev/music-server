const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://music-server:musicserver@cluster0.5n15f.mongodb.net/Project0?retryWrites=true&w=majority";
const GenresSchema = require("../../api/genre/genre.model");

const Genres = [
  {
    name: "Música Clásica",
    description: `La música clásica es la corriente musical que se basa principalmente 
    en la música producida o basada en las tradiciones de la música litúrgica y secular de Occidente, 
    principalmente Europa Occidental.`,
    artist: ["61e16fc93e64f9f16b47479d", "61e170653e64f9f16b4747a0", "61e170ee3e64f9f16b4747a3"],
    instrumentation: "Violín"
  },
  {
    name: "Blues",
    description: `El blues (pronunciado [blus], cuyo significado es melancolía o tristeza) es 
    un género musical vocal e instrumental, basado en la utilización de notas de blues y 
    de un patrón repetitivo, que suele seguir una estructura de doce compases.`,
    artist: ["61e1716c3e64f9f16b4747a6", "61e1720d3e64f9f16b4747a9", "61e1727a3e64f9f16b4747ac"],
    instrumentation: "Guitarra, bajo eléctrico, batería, piano, armónica, saxofón, voz, trombón, trompeta."
  },
  {
    name: "Jazz",
    description: `El jazz es un género musical nacido a finales 
    del siglo XIX en los Estados Unidos, que se expandió de forma global a lo largo del siglo XX.`,
    artist: ["61e172f83e64f9f16b4747af", "61e1735e3e64f9f16b4747b2", "61e173bd3e64f9f16b4747b5"],
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
