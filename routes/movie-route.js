const express = require('express')
const { getAllMovies, getSingleMovie, addSingleMovie, deleteSingleMovie, updateSingleMovie } = require('../controllers/movie-controller')
const router = express.Router()

// get all the movies
router.get('/' , getAllMovies)

// get single movie 
router.get('/:id' , getSingleMovie)

// add a single movie ( admin only )
router.post('/add' , addSingleMovie)

// delete a single movie ( admin only )
router.delete('/:id' , deleteSingleMovie)

// update single movie ( admin only )
router.put('/:table' , updateSingleMovie)


module.exports = router