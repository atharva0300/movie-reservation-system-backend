const path = require('path')
const dotenv = require('dotenv')
// const {URL} = require('url')
dotenv.config()

const logsList = ['server' , 'booking',  'auth' , 'movie' , 'notification' , 'search' , 'user' , 'showtime' , 'comment' , 'theater' , 'offer' , 'general']
const apiTypePortMapping = {
    'auth' : process.env.AUTH_PORT,
    'movies' : process.env.MOVIE_PORT,
    'search' : process.env.SEARCH_PORT,
    'slots' : process.env.SHOWTIME_PORT,
    'booking' : process.env.BOOKING_PORT,
    'comment' : process.env.COMMENT_PORT,
    'offer' : process.env.OFFER_PORT,
    'theater' : process.env.THEATER_PORT,
    'user' : process.env.USER_PORT
}

const createPath = (originalUrl , apiType) => {
    let newUrl = 'http://localhost:'
    let portNumber;
    if(logsList.includes(apiType)){
        portNumber = apiTypePortMapping[apiType]
    }else{
        throw new Error('Invalid API type');
    }
    newUrl += portNumber
    newUrl += originalUrl
    
    console.log('New path in createPath:', newUrl);
    return newUrl
};

module.exports = createPath
