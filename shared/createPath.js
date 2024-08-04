const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const URL = 'http://localhost:'
const createPath = async (reqPath , apiType , method , params ) => {
    const parsedPath = path.parse(reqPath)
    console.log(parsedPath)
    let newPath;
    switch(apiType){
        case 'auth' : newPath = URL + process.env.AUTH_PORT.toString() + '/' + parsedPath.name
        case 'movies' : newPath = URL + process.env.MOVIE_PORT.toString() + '/' + reqPath

    }
    console.log(newPath)
    return newPath 
}

module.exports = createPath
