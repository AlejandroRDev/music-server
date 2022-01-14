const GenreRoutes = require('express').Router()
const { isAuth } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const { postNewGenre, getAllGenres, getGenre, patchGenre, deleteGenre } = require('./genre.controller')


GenreRoutes.get('/', getAllGenres)
GenreRoutes.get('/:id', getGenre)
GenreRoutes.post('/', [isAuth], upload.single('img'), postNewGenre)
GenreRoutes.patch('/:id', [isAuth], upload.single('img'), patchGenre)
GenreRoutes.delete('/:id', [isAuth], upload.single('img'), deleteGenre)

module.exports = GenreRoutes