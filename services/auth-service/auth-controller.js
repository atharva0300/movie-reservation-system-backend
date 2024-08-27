const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// pgclient 
const pgPool = require('../../config/pgPoolConfig')

// logger
const { logger : customLogger } = require('../../logs/logger/logger.config')

const extractJWTCookieValue = (cookieHeader) => {
    if (cookieHeader) {
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === 'jwt') {
                return value;
                break;
            }
        }
    }
}

const register = async(req , res) => {
    const {name , email , password , role } = req.body

    try{
        const existingUser = await pgPool.query('SELECT * FROM public."User" WHERE email = $1' , [email])
        if(existingUser.rowCount!=0){
            customLogger.info(`User email already exists` , 'auth')
            return res.status(400).json({message : 'User already exists' , code : 'authCode1'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const createDate = new Date().toISOString()
        
        try{
            await pgPool.query('INSERT INTO public."User" (email, password , name , createdate , role) VALUES ( $1 , $2 , $3  , $4 , $5 )' , [email , hashedPassword , name , createDate , role])
            customLogger.info(`Inserted new user into table` , 'auth')
            res.status(201).json({message : 'User registered successully'})
        }catch(err){
            customLogger.error(err , 'auth')
            res.status(500).json({message : 'DB error'})
        }
    }catch(err){
        customLogger.error(err , 'auth')
        res.status(500).json({message : 'Auth Register server error'})
    }
} 

const login = async(req , res) => {
    const {email , password} = req.body
    try{
        const user = await pgPool.query('SELECT * FROM public."User" WHERE email = $1' , [email])
        if(user.rowCount == 0){
            // the user does not exists in the database
            customLogger.error('User does not exists' , 'auth')
            return res.status(400).json({message : 'User does not exists' , 'code' : 'loginCode1'})
        }
        const isMatch = await bcrypt.compare(password , user.rows[0].password)
        if(user.rowCount == 1 && !isMatch){
            // user exists but incorrect password
            customLogger.error('Invalid credentials' , 'auth')
            return res.status(400).json({message : 'Invalid credentials' , 'code' : 'loginCode2'})
        }
        if(user.rowCount == 1 && isMatch){
            const userName = user.rows[0].name
            const userEmail = user.rows[0].email
            try{
                // sign with jwt 
                const accessToken = jwt.sign(
                    {"useremail" : userEmail , "role" : user.rows[0].role},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn : '5m' } 
                )
                const refreshToken = jwt.sign(
                    {"useremail" : userEmail , "role" : user.rows[0].role},
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn : '1d'}
                )
                const response = await pgPool.query('UPDATE public."User" SET refreshtoken = $1 WHERE email = $2' , [refreshToken , email])
                if(response.rowCount == 1){
                    customLogger.info('login successful' , 'auth')
                    res.cookie('jwt' , refreshToken , {httpOnly : true, maxAge : 24 * 60 * 60 * 1000})
                    return res.status(200).json({message : 'login successfully', data : JSON.stringify(accessToken) , jwtName : 'jwt' , refreshToken : refreshToken , maxAge : 24*60*60*1000 , httpOnly : true})
                }else{
                    customLogger.info('failed to insert refresh token' , 'auth')
                    return res.status(401).json({message : 'failed to login'})
                }
                
            }catch(err){
                console.log('err : ' , err)
                customLogger.error('err' , 'auth')
                return res.status(500).json({message : JSON.stringify(err.message)})
            }
        }else{
            customLogger.error('User does not exists' , 'auth')
            return res.status(400).json({message : 'User does not exists' , 'code' : 'loginCode1'})
        }

    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'auth')
        return res.status(500).json({message : 'auth Login error'})
    }
}

const logout = async(req , res) => { 
    // on client, delete the access token 
    const refreshToken = extractJWTCookieValue(req.headers.cookie)
    if(!refreshToken){
        customLogger.info('Cookie already absent' , 'auth')
        return res.sendStatus(201)  // no content
    }
    try{
        // is refreshtoken in db ? 
        const result = await pgPool.query('SELECT refreshtoken , email from public."User" WHERE refreshtoken = $1' , [refreshToken])
        if(result.rowCount == 1 && result.rows[0].refreshtoken){
            // clear the cookie 
            customLogger.info('Cookie cleared, logged out' , 'auth')
            res.clearCookie('jwt' , {httpOnly : true})
            
            // delete refreshToken from db
            const result2 = await pgPool.query('UPDATE public."User" SET refreshtoken = $1 WHERE email = $2' , [null , result.rows[0].email])
            if(result2.rowCount == 1){
                customLogger.info('refreshtoken delete from db' , 'auth')
                return res.sendStatus(204);
            }else{
                customLogger.info('Refresh token not found in db while deleting' , 'auth')
                return res.sendStatus(204);
            }
        }else{
            customLogger.info('refresh token not present in db, logged out' , 'auth')
            res.clearCookie('jwt' , {httpOnly : true})
            return res.sendStatus(204);
        }   
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'auth')
        return res.status(500).json({message : 'logout error'})
    }
}

const refreshToken = async(req , res) => {
    const refreshToken = extractJWTCookieValue(req.headers.cookie)
    if(!req.headers.cookie || !refreshToken) return res.status(401).json({message : 'unauthorized'})
    try{
        const result = await pgPool.query('SELECT refreshtoken, email from public."User" WHERE refreshtoken = $1' , [refreshToken])
        if(result.rowCount == 1 && refreshToken == result.rows[0].refreshtoken){
            const userRefreshToken = result.rows[0].refreshtoken
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err , decoded) => {
                    if(err || result.rows[0].email != decoded.useremail ){
                        return res.status(403).json({message : 'Unauthorized'})  // forbidden
                    }
                    const accessToken = jwt.sign(
                        {"useremail" : result.rows[0].email , "role" : result.rows[0].role },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn : '5m'}
                    );
                    customLogger.info('access token refreshed' , 'auth')
                    res.status(200).json({message : 'access token refreshed' , data : accessToken})
                }
            )
            return res
        }else{
            customLogger.info('The email does not eists' , 'auth')
            return res.status(403).json({message : 'unauthorized'}) // forbidden
        }
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'auth')
        return res.status(500).json({message : 'refreshToken  error'})
    }
}

const updatePassword = async(req, res) => {
    const {userid , password} = req.body
    try{
        const user = await pgPool.query('SELECT * FROM public."User" WHERE userid = $1' , [userid])
        if(user.rowCount == 1){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            try{
                const updateResponse = await pgPool.query('UPDATE public."User" SET password = $1 WHERE userid = $2' , [hashedPassword , userid])
                if(updateResponse.rowCount == 1){
                    customLogger.info('password updated' , 'auth')
                    return res.status(200).json({message : 'password updated'})
                }
            }catch(err){
                customLogger.error(err , 'auth')
                return res.status(500).json({message : 'failed to update password'})
            } 
        }else{
            customLogger.info('User with userid does not exist' , 'auth')
            return res.status(400).json({message : 'User with userid does not exist'})
        }
    }catch(err){
        customLogger.error(err , 'auth')
        return res.status(500).json({message : 'updatePassword Error'})
    }
}

module.exports = {register , login , logout , refreshToken , updatePassword}