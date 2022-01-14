// En este apartado vamos a asignar las rutas a los controllers
//requerimos las dependencias
const ArtistRoutes = require ('express').Router()
const { isAuth} = require ('../../middleware/auth')
const upload = require('../../middleware/file')
//Definimos las rutas
const { postNewArtist, getAllArtist, getArtist, patchArtist, deleteArtist } = require('./artist.controller')
ArtistRoutes.get('/', getAllArtist)
ArtistRoutes.get('/:id', getArtist)
ArtistRoutes.post('/', [isAuth], upload.single('img'), postNewArtist)
ArtistRoutes.patch('/:id', [isAuth], upload.single('img'), patchArtist)
ArtistRoutes.delete('/:id', [isAuth], upload.single('img'), deleteArtist)
module.exports = ArtistRoutes