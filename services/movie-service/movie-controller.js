const path = require('path')
const { MongoClient } = require('mongodb')

// clients
const mongoClient = new MongoClient(process.env.MONGO_URI)
const redisClient = require('./config/redisConfig')

// logger
const {logger : customLogger} = require('./logger/logger.config')


const getSingleMovie = async(req , res) => {
    const {id : titleid } = req.params 
    if(!titleid){
        customLogger.error('titleid is undefined' ,  'movie')
        return res.status(400).json({message : 'invalid titleid'})
    }
    try{   
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)

        const [movie , cast , review , director , genre , trailer_gallery ] = await Promise.all([
            db.collection('movie_info').findOne({id : titleid}),
            db.collection('cast').findOne({movieId : titleid}),
            db.collection('review').findOne({movieId : titleid}),
            db.collection('director').findOne({movieId : titleid}),
            db.collection('genre').findOne({movieId : titleid}),
            db.collection('trailer_gallery').findOne({movieId : titleid})
        ])
        const sendingObj  = {movie, cast , review , director , genre , trailer_gallery }
        if(movie){
            customLogger.info('movie found' , 'movie')
            return res.status(200).json({message : 'movie found' , data : JSON.stringify(sendingObj)})
        }else{
            customLogger.error('movie not found' , 'movie')
            return res.status(400).json({message : 'movie not found' , data : JSON.stringify({})})
        }
    }catch(err){
        customLogger.error(err , 'movie')
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}


const insertSingleMovie = async(req , res) => {
    const {movieInfoData , castData , directorData , genreData , reviewData , trailerGalleryData} = req.body
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const [movieInfoResponse , castResponse , directorResponse , genreResponse , reviewDataResponse , trailerGalleryResponse] = await Promise.all([
            db.collection('movie_info').insertOne(movieInfoData),
            db.collection('cast').insertOne(castData),
            db.collection('director').insertOne(directorData),
            db.collection('genre').insertOne(genreData),
            db.collection('review').insertOne(reviewData),
            db.collection('trailer_gallery').insertOne(trailerGalleryData)
        ])
        if(movieInfoResponse && castResponse && directorResponse && genreResponse && reviewDataResponse && trailerGalleryResponse){
            customLogger.info('movie inserted in the db' , 'movie')
            return res.status(200).json({message : 'works'})
        }else{
            customLogger.error('failed to insert movie' , 'movie')
            return res.status(400).json({message : 'failed to insert movies'})
        }
    }catch(err){
        customLogger.error(err , 'movie')
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const getAllMovies = async(req , res) => {
    try{
        // check in database
        const redisKey = "get-all-movies"
        const cachedResult = await redisClient.get(redisKey)
        // console.log('cachedResult : ' , cachedResult)
        if(cachedResult){
            return res.status(200).json({fromCache : true, message : 'fetched all movies from movie_info' , data : JSON.stringify(cachedResult)})
        }
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const movieInfoResponse = await db.collection('movie_info').find().toArray()
        if(movieInfoResponse){
            customLogger.info('fetched all movies from movie_info' , 'movie')
            // add the data in the redis cache 
            await redisClient.set(redisKey , JSON.stringify(movieInfoResponse))
            return res.status(200).json({fromCache : false, message : 'fetched all movies from movie_info' , data : JSON.stringify(movieInfoResponse)})
        }else{
            customLogger.error('failed to fetch all movies' , 'movie')
            return res.status(400).json({message : 'failed to fetch all movies'})
        }
    }catch(err){
        customLogger.error(err , 'movie')
        return res.status(500).json({message : 'getAllMovies error'})
    }
}

const deleteSingleMovie = async(req , res) => {
    const {id} = req.params
    if(!id){
        customLogger.error('movieId is not defined' , 'movie')
        return res.status(400).json({message : 'movieId is not defined'})
    }
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const [movieInfoResponse ,  ,  ,  ,  , ] = await Promise.all([
            db.collection('movie_info').deleteOne({id : id}),
            db.collection('cast').deleteOne({movieId : id}),
            db.collection('director').deleteOne({movieId : id}),
            db.collection('genre').deleteOne({movieId : id}),
            db.collection('review').deleteOne({movieId : id}),
            db.collection('trailer_gallery').deleteOne({movieId : id})
        ])
        if(movieInfoResponse.deletedCount > 0){
            customLogger.info('movie deleted from the db' , 'movie')
            return res.status(200).json({message : 'movie deleted from db'})
        }else{
            customLogger.error('failed to delete movie, deleteCount is <=0 ' , 'movie')
            return res.status(400).json({message : 'failed to delete movie, deletedCount is <=0'})
        }
    }catch(err){
        return res.status(500).json({message : 'deleteSingleMovie error'})
    }
}

const updateSingleMovie = async(req , res) => {
    const movieInfoObject = req.body
    const {table} = req.params
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        try{
            // the movieId exist
            let updateResponse;
            if(table == 'movie_info'){
                try{
                    updateResponse = await db.collection(table).findOneAndReplace(
                        {"id" : movieInfoObject.id},
                        movieInfoObject,
                    )
                    customLogger.info('movie_info table collection updated' , 'movie')
                }catch(err){
                    customLogger.error(err , 'movie')
                    return res.status(400).json({message : 'findOneAndreplace failed in movie_info'})
                }
            }else{
                try{
                    updateResponse = await db.collection(table).findOneAndReplace(
                        {"movieId" : movieInfoObject.movieId},
                        movieInfoObject
                    )
                    customLogger.info('table collection updated' , 'movie')
                }catch(err){
                    customLogger.error(err , 'movie')
                    return res.status(400).json({message : 'findOneAndreplace failed in movie_info'})
                }
            }
            return res.status(201).json({message : 'table document updated'})
        }catch(err){
            customLogger.error(err , 'movie')
            return res.status(400).json({message : 'given movieId not present in table'})
        }
    }catch(err){
        return res.status(500).json({message : 'updating single movie error'})
    }
}



module.exports = {getSingleMovie , insertSingleMovie , getAllMovies , deleteSingleMovie , updateSingleMovie}