const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const URL = 'http://localhost:';

const createPath = (pathObject) => {
    const {reqPath , apiType , query} = pathObject
    console.log('reqpath :  ', reqPath)
    const parsedPath = path.parse(reqPath);
    console.log('parsed path : ' , parsedPath);
    console.log('API type:', apiType);

    let newPath;

    switch(apiType) {
        case 'auth':
            const authPort = process.env.AUTH_PORT;
            if (!authPort) throw new Error('AUTH_PORT is not defined');
            newPath = `${URL}${authPort}/${parsedPath.name}`;
            break;

        case 'movies':
            const moviePort = process.env.MOVIE_PORT;
            if (!moviePort) throw new Error('MOVIE_PORT is not defined');
            newPath = `${URL}${moviePort}${reqPath}`;
            break;
        
        case 'search':
            const searchPort = process.env.SEARCH_PORT;
            if(!searchPort) throw new Error('SEARCH_PORT is not defined')
            newPath = `${URL}${searchPort}${reqPath}?q=${query}`;
            break;

        default:
            throw new Error('Invalid API type');
    }

    console.log('New path in createPath:', newPath);
    return newPath;
};

module.exports = createPath
