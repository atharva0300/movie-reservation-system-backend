const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyJWT = (req , res , next) => {
    const authHeader  = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]
    // verif the token 
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err , decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.useremail = decoded.useremail
            req.role = decoded.role
            next()
        }
    )
}

module.exports = verifyJWT
