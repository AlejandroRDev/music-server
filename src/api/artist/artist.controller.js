//Requerimos el modelo
const Artist = require("./artist.model");

// Requerimos el controlador de errores y el delete

const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middleware/deleteFile");


// Metodos POST, GETALL, GET , PATCH Y DELETE :

const postNewArtist = async (req, res, next) => {
  try {
    const newArtist = new Artist();
    newArtist.name = req.body.name;
    if (req.file) {
      newArtist.img = req.file.path;
    }
    newArtist.nationality= req.body.nationality;
    newArtist.genre= req.body.genre;
    newArtist.songs = req.body.songs;
    newArtist.instrument= req.body.instrument;
    newArtist.ageOfBirth= req.body.ageOfBirth;
    const artistDb = await newArtist.save();
    return res.status(201).json(artistDb);
  } catch (error) {
    return next(setError(500, "Artist not saved"));
  }
};

const getAllArtist = async (req, res, next) => {
  try {
    const artistDb = await Artist.find();
    res.status(200).json(artistDb);
  } catch (error) {
    return next(setError(500, "Artist failed server"));
  }
};
const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artistDb = await Artist.findById(id);
    if (!artistDb) {
      return next(setError(404, "Artist not found"));
    }
    return res.status(200).json(artistDb);
  } catch (error) {
    return next(setError(500, "Artist server error"));
  }
};

const patchArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchArtist = new Artist(req.body);
    patchArtist._id = id;
    if (req.file) {
      patchArtist.img = req.file.path;
    }
    const artistDb = await Artist.findByIdAndUpdate(id, patchArtist);
    if (!artistDb) {
      return next(setError(404, "Artist not found"));
    }
   /*  if (artistDb.img) deleteFile(artistDb.img); */
    return res.status(200).json({ new: patchArtist, old: artistDb });
  } catch (error) {
    return next(500, "Artist patch server error");
  }
};
const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artistDb = await Artist.findByIdAndDelete(id);
    if (!artistDb) {
      return next(setError(500, "Artist not found"));
    }
    if (artistDb.img) deleteFile(artistDb.img);
    return res.status(200).json(artistDb);
  } catch (error) {
    return next(setError(500, "Artist remove server error"));
  }
};


// Exportamos todas las funciones 
module.exports = {
  postNewArtist,
  getArtist,
  getAllArtist,
  patchArtist,
  deleteArtist,
};
