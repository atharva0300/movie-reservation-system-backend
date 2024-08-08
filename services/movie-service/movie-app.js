const express = require('express')
const dotenv = require('dotenv');
const { getAllMovies, insertSingleMovie, getSingleMovie, deleteSingleMovie, updateSingleMovie } = require('./movie-controller');
dotenv.config()

const MOVIE_PORT = process.env.MOVIE_PORT

const app = express();

// middleware 
app.use(express.json())

// routes
app.get('/' , getAllMovies) // get all movies

app.post('/' , insertSingleMovie)   // add a single movie ( admin only )

app.get('/:id' , getSingleMovie)    // get single movie by id

app.delete('/:id' , deleteSingleMovie)  // delete single movie ( admin only )

app.put('/:table' , updateSingleMovie)    // update single movie (admin only )



app.listen(MOVIE_PORT , () => {
    console.log('movie-service listening on PORT : ' , MOVIE_PORT);
})
