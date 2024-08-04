const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const URL = 'http://localhost:'
const createPath = (reqPath) => {
    const parsedPath = path.parse(reqPath)
    const AUTH_PORT = process.env.AUTH_PORT
    const newPath = URL + AUTH_PORT.toString() + '/' + parsedPath.name
    console.log(newPath)
    return newPath 
}

module.exports = createPath
