const express = require('express')
const { getAllMovies, getSingleMovie } = require('../controllers/movie-controller')
const router = express.Router()

// get all the movies
router.get('/' , getAllMovies)

// get single movie 
router.post('/:id' , getSingleMovie)


module.exports = router