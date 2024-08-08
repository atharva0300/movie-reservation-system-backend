
// logger
const {logger : customLogger} = require('../../logs/logger/logger.config')

// pg client 
const pgPool = require('../../config/pgPoolConfig')

const updateUserName = async (req , res ) => {
    const {username , email} = req.body
    if(!username || !email) return res.status(400).json({message : 'Username or email is invalid'})
    try{
        const result = await pgPool.query('UPDATE public."User" SET name = $1 WHERE email = $2' , [username , email])
        if(result.rowCount == 1 ){
            customLogger.info('updated the username' , 'user')
            return res.status(200).json({message : 'updaed the username'})
        }else{
            customLogger.info('failaed to update username , email not present in db' , 'user')
            return res.status(400).json({message : 'failed to update usernmae, email not present in db'})
        }
    }catch(err){
        customLogger.error(err.message , 'user')
        return res.status(500).json({message : err.message})
    }
}

module.exports = {updateUserName}