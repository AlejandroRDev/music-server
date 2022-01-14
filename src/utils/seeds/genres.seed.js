const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://music-server:musicserver@cluster0.5n15f.mongodb.net/Project0?retryWrites=true&w=majority";
const GenresSchema = require("../../api/genre/genre.model");

const Genres = [
  {
    name: "Música Clásica",
    description: `La música clásica es la corriente musical que se basa principalmente en la música producida o basada en las tradiciones de la música litúrgica y secular de Occidente, principalmente Europa Occidental.`,
    artist: ["61e16fc93e64f9f16b47479d", "61e170653e64f9f16b4747a0", "61e170ee3e64f9f16b4747a3"],
    instrumentation: ["Cuerda frotada", "Viento Madera", "Viento Metal", "Percusión"]
  },
  {
    name: "Blues",
    description: `El blues (pronunciado [blus], cuyo significado es melancolía o tristeza) es un género musical vocal e instrumental, basado en la utilización de notas de blues y de un patrón repetitivo, que suele seguir una estructura de doce compases.`,
    artist: ["61e1716c3e64f9f16b4747a6", "61e1720d3e64f9f16b4747a9", "61e1727a3e64f9f16b4747ac"],
    instrumentation: ["Guitarra", "bajo eléctrico", "batería", "piano", "armónica", "saxofón", "voz", "trombón", "trompeta"]
  },
  {
    name: "Jazz",
    description: `El jazz es un género musical nacido a finales del siglo XIX en los Estados Unidos, que se expandió de forma global a lo largo del siglo XX.`,
    artist: ["61e172f83e64f9f16b4747af", "61e1735e3e64f9f16b4747b2", "61e173bd3e64f9f16b4747b5"],
    instrumentation: ["Guitarra", "bajo eléctrico", "batería"]
  },
  {
    name: "Death Metal",
    description: "Se caracteriza por utilizar voces guturales, guitarras con un uso excesivo de overdrive, afinaciones graves para sus instrumentos, percusión rápida (con un dominante uso del doble pedal), complejas estructuras musicales, además de técnicas poco ortodoxas para la composición de los riffs de guitarra.",
    artist: ["61e167034d7ca5c30b8c2b68", "61e167314d7ca5c30b8c2b6b"],
    instrumentation: ["Guitarra", "Bajo", "Bateria", "Vocalista"]
  },
 {
    name: "Slam",
    description: "En el Slam la atención se centra en los grooves y ritmos de tempos lentos, mientras que los blast beats no se utilizan con tanta frecuencia, pero todavía se utilizan ocasionalmente. Los riffs de guitarra se tocan muy bajos, por lo general alrededor de B Drop, pero a veces inferior.",
    artist: ["61e16d694d7ca5c30b8c2b95", "61e16da64d7ca5c30b8c2b98"],
    instrumentation: ["Guitarra", "Bajo", "Bateria", "Vocalista"]
  },
{
    name: "Deathcore",
    description: "Nació de la fusión del metalcore y el death metal como base, usando también elementos grindcore, y en algunas ocasiones del black metal.",
    artist: ["61e16b834d7ca5c30b8c2b7e", "61e16b164d7ca5c30b8c2b7b"],
    instrumentation: ["Guitarra", "Bajo", "Bateria", "Vocalista"]
  },
{
    name: "Death Metal Tecnico",
    description: "El subgénero musical se desarrolla a finales de los años '80s y principios de los años 1990, tomando como referencia probablemente a la banda estadounidense Death, quienes con su álbum Human (1991) llevaron el estilo a otro nivel; solos caóticos y una sensación de técnica más cercana al estilo de la mítica banda de thrash metal progresivo Watchtower, pero con el riffing y una actitud más enérgica y agresiva.",
    artist: ["61e169194d7ca5c30b8c2b6f", "61e1697b4d7ca5c30b8c2b78"],
    instrumentation: ["Guitarra", "Bajo", "Bateria", "Vocalista"]
  },
  {
    name: "Hip Hop",
    description: "Estilo de música de baile nacido en Estados Unidos de América en la década de 1970 como derivación del funk y que se caracteriza por su base electrónica y por estar asociado a manifestaciones alternativas como el break dance o el graffiti.",
    artist: ["61e16b2d56fa71fe556ee5c6", "61e16a3056fa71fe556ee5c3", "61e1694156fa71fe556ee5c0", "61e1722d56fa71fe556ee5ea","61e16bd856fa71fe556ee5c9"],
    instrumentation: ["Vocalista", "Sintetizador", "Mesa de Mezclas", "Batería, Guitarra", "Bajo"]
}, 
{
    name: "Trap",
    description: "El trap es un subgénero musical del rap que se originó en la década de los 90 en el sur de los Estados Unidos.",
    artist: ["61e16c8656fa71fe556ee5cc", "61e16d1756fa71fe556ee5cf", "61e16da956fa71fe556ee5d2", "61e16e8d56fa71fe556ee5d5"],
    instrumentation: ["Vocalista", "Sintetizador", "Mesa de Mezclas", "Batería", "Guitarra", "Bajo"]
}, 

{
    name: "Techno",
    description: "El techno (adaptado al español como tecno) es un género de música electrónica que surgió en Detroit (Estados Unidos) y Alemania hacia mediados de los años 1980.",
    artist: ["61e16f8a56fa71fe556ee5d8", "61e1701956fa71fe556ee5de", "61e1707556fa71fe556ee5e1", "61e1715356fa71fe556ee5e4"],
    instrumentation: ["Sintetizador", "Mesa de Mezclas"]
}, 

{
    name: "Rock",
    description: "El rock es un amplio género de música popular originado como «rock and roll» a principios de la década de 1950 en Estados Unidos y, que evolucionaría en un gran rango de diferentes estilos durante mediados de los años 60 y posterior, particularmente en ese país y Reino Unido.",
    artist: ["61e1755d56fa71fe556ee5f6", "61e174b856fa71fe556ee5f0"],
    instrumentation: ["Vocalista", "Teclado/sintetizador", "Mesa de Mezclas", "Batería", "Guitarra", "Bajo"]
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
