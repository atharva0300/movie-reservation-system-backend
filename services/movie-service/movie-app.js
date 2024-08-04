const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const MOVIE_PORT = process.env.MOVIE_PORT

const app = express();

app.listen(MOVIE_PORT , () => {
    console.log('movie-service listening on PORT : ' , MOVIE_PORT);
})
