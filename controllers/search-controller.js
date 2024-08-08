const createPath = require('../utils/createPath')

const apiType = 'search'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')

const searchTermController = async(req , res) => {
    console.log(req.url)
    console.log(req.baseUrl)
    console.log(req.originalUrl)
    console.log(req.query.searchTerm)
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            }
        })
        const data = await response.json();
        customLogger.info(`search term successful ${response.status}` , 'server')
        return res.status(response.status).json({message : 'found' , data })
    }catch(err){
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'searchTerm in main server error'})
    }
}

module.exports = {searchTermController}