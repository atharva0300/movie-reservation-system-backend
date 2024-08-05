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

        case 'slots' : 
            const showTimePort = process.env.SHOWTIME_PORT
            if(!showTimePort) throw new Error('SHOW_TIME PORT is not defined')
            newPath = `${URL}${showTimePort}${reqPath}?q=${query}`;
            break;
        
        case 'booking' : 
            const bookingPort = process.env.BOOKING_PORT
            if(!bookingPort) throw new Error('BOOKING_PORT is not defined')
            newPath = `${URL}${bookingPort}${reqPath}`;
            break;

        default:
            throw new Error('Invalid API type');
    }

    console.log('New path in createPath:', newPath);
    return newPath;
};

module.exports = createPath
