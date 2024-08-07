const createPath = require('../shared/createPath')

const apiType = 'booking'

// logger
const {logger : customLogger} = require('../logs/logger/logger.config')

const bookBulkTicketController = async(req , res) => {
    const pathObj = { reqPath : req.path, apiType }
    const newPath = createPath(pathObj)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json();
        customLogger.info('booking fetched' , 'server')
        return res.status(response.status).json({message : data?.message})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'boolBulkTicketController Error'})
    }
}  


module.exports = {bookBulkTicketController}