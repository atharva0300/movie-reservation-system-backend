const express = require('express')
const { getAllMovies, getSingleMovie, addSingleMovie, deleteSingleMovie, updateSingleMovie } = require('../controllers/movie-controller')
const verifyJWT = require('../middlewares/verifyJWT')
const verifyAdmin = require('../middlewares/verifyAdmin')
const router = express.Router()

// get all the movies
router.get('/' , getAllMovies)

// get single movie 
router.get('/:id' , getSingleMovie)

// add a single movie ( admin only )
router.post('/add' , verifyJWT , verifyAdmin , addSingleMovie)

// delete a single movie ( admin only )
router.delete('/:id' , verifyJWT , verifyAdmin , deleteSingleMovie)

// update single movie ( admin only )
router.put('/:table' , verifyJWT , verifyAdmin , updateSingleMovie)


module.exports = router