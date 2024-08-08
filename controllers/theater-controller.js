const createPath = require('../utils/createPath')

const apiType = 'theater'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')

const commonFetch = async(req , res , errorMessage , successMessage) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET'
        })
        const data = await response.json()
        if(response.status == 200){
            customLogger.info(successMessage , 'theater')
            return res.status(response.status).json({message : data.message , data : data.data})
        }else{
            customLogger.info(data.message, 'theater')
            return res.status(response.status).json({message : data.message})
        }
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : errorMessage})
    }
}

const getAllTheatersController = async(req , res) => {
    await commonFetch(req , res , 'getAllTheatersController Error' , 'all theaters fetched successfully')
}

const getTheaterByIdController = async(req , res) => {
    await commonFetch(req , res  , 'getTheaterByIdController Error' , 'fetched theater by theater id')
}

const getScreenDetailsByTheaterIdController = async(req , res) => {
    await commonFetch(req , res , 'getScreenDetailsByTheaterIdController Error' , 'fetched screen details by theater id')
}

const getSeatDetailsByIdController = async(req , res) => {
    await commonFetch(req , res , 'getSeatDetailsByIdController Error' , 'fetched seat details by screen id')
}

module.exports = {getAllTheatersController , getTheaterByIdController , getScreenDetailsByTheaterIdController , getSeatDetailsByIdController}