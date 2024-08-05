const express = require('express')
const dotenv = require('dotenv');
const { getAllMovies, insertSingleMovie, getSingleMovie } = require('./movie-controller');
dotenv.config()

const MOVIE_PORT = process.env.MOVIE_PORT

const app = express();

// middleware 
app.use(express.json())

app.get('/' , getAllMovies)

app.post('/' , insertSingleMovie)

app.get('/:id' , getSingleMovie)




app.listen(MOVIE_PORT , () => {
    console.log('movie-service listening on PORT : ' , MOVIE_PORT);
})
