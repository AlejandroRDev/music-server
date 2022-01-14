const Genre = require('./genre.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middleware/deleteFile')


const postNewGenre = async (req, res, next) => {
    try {
        const newGenre = new Genre()
        newGenre.name = req.body.name
        newGenre.artist = req.body.artist /* */
        if (req.file) {
            newGenre.img = req.file.path
        }
        const genreDB = await newGenre.save()
        return res.status(201).json(genreDB)
    } catch (error) {
        return next(setError(500, 'Genre not saved'))
    }
}

const getAllGenres = async (req, res, next) => {
    try {
        const GenresDb = await Genre.find().populate('artist')
        res.status(200).json(GenresDb)
    } catch (error) {
        return next(setError(500, 'Genre failed server'))
    }
}

const getGenre = async (req, res, next) => {
    try {
        const { id } = req.params
        const genreDb = await Genre.findById(id).populate('artist')
        if (!genreDb) {
            return next(setError(404, 'Genre not found'))
        }
        return res.status(200).json(genreDb)
    } catch (error) {
        return next(setError(500, 'Genre server error'))
    }
}

const patchGenre = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchGenre = new Genre(req.body)
        patchGenre._id = id
        if (req.file) {
            patchGenre.img = req.file.path
        }
        const genreDb = await Genre.findByIdAndUpdate(id, patchGenre)
        if (!genreDb) {
            return next(setError(404, 'Genre not found'))
        }
        if (genreDb.img) deleteFile(genreDb.img)
        return res.status(200).json({ new: patchGenre, old: genreDb })
    } catch (error) {
        return next(setError(500, 'Genre Patch server error'))
    }
}

const deleteGenre = async (req, res, next) => {
    try {
        const { id } = req.params
        const genreDb = await Genre.findByIdAndDelete(id)
        if (!genreDb) {
            return next(setError(404, 'Genre not found'))
        }
        if (genreDb.img) deleteFile(genreDb.img)
        return res.status(200).json(genreDb)
    } catch (error) {
        return next(setError(500, 'Genre removed server error'))
    }
}

module.exports = {
    postNewGenre,
    getAllGenres,
    getGenre,
    patchGenre,
    deleteGenre
}