const {MongoClient} = require('mongodb')
const path = require('path')

// db clients
const mongoClient = new MongoClient(process.env.MONGO_URI.toString())
const pgPool = require('./config/pgPoolConfig')

// logger 
const {logger : customLogger} = require('./logger/logger.config')

const searchMovieController = async(req , res , next) => {
    const searchTerm = req.query.q
    try{
        await mongoClient.connect();
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)

        // search in movie_info 
        await db.collection('movie_info').findOne({titleText : searchTerm}).then((movie) => {
            if(movie){
                const sendObj = {
                    movie,
                    searchFoundIn : 'movie_info'
                }
                customLogger.info('search found' , 'search')
                return res.status(200).json({message : 'movie : search found' , data : JSON.stringify(sendObj)})
            }else{
                customLogger.info('movie : search not found' , 'search')
                next()
            }
        }).catch(err => {
            customLogger.error(err , 'search')
            return res.status(500).json({message : 'movie read mongodb error' , data : JSON.stringify({})})
        })
    }catch(err){
        customLogger.error(err , 'search')
        return res.status(500).json({message : 'searchMovie Error'})
    }
}


const searchPlaceController = async(req , res , next) => {
    const searchTerm = req.query.q;
    try{
        // search in place 
        await pgPool.query('SELECT * FROM public."Place" WHERE city = $1' , [searchTerm]).then((result) => {
            if(result.rowCount !=0 ){
                const sendObj = {
                    place : result.rows,
                    searchFoundIn : 'place'
                }
                customLogger.info('place : search found' , 'search')
                return res.status(200).json({message : 'search found' , data : JSON.stringify(sendObj)})
            }else{
                customLogger.info('theater : search not found' , 'search')
                next()
            }
        }).catch(err => {
            customLogger.error(err , 'search')
            return res.status(500).json({message : 'place read postgres error' , data : JSON.stringify({})})
        })
    }catch(err){
        customLogger.error(err , 'search')
        return res.status(500).json({message : 'searchPlace Error'})
    }
}

const searchTheaterController = async(req , res) => {
    const searchTerm = req.query.q;
    try{
        // search in theater
        await pgPool.query('SELECT * FROM public."Theater" WHERE name = $1' , [searchTerm]).then((result) => {
            if(result.rowCount != 0){
                const sendObj = {
                    theater : result.rows,
                    searchFoundIn : 'theaters'
                }
                customLogger.info('theater : search found', 'search')
                return res.status(200).json({message : 'search found' , data : JSON.stringify(sendObj)})
            }else{
                customLogger.info('theater : search not found' , 'search')
                return res.status(400).json({message : 'search term not found' , data : JSON.stringify({})})
            }
        }).catch(err => {
            customLogger.error(err , 'search')
            return res.status(500).json({message : 'theater read postgres error' , data : JSON.stringify({})})
        })
    }catch(err){
        console.log(err)
        customLogger.error(err , 'search')
        return res.status(500).json({message : 'searchTheater Error'})
    }
}


module.exports = {searchMovieController , searchPlaceController , searchTheaterController}