const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// pgclient 
const pgPool = require('../../config/pgPoolConfig')

// logger
const { logger : customLogger } = require('../../logs/logger/logger.config')

const register = async(req , res) => {
    const {name , email , password } = req.body

    try{
        const existingUser = await pgPool.query('SELECT * FROM public."User" WHERE email = $1' , [email])
        if(existingUser.rowCount!=0){
            customLogger.info(`User email already exists` , 'auth')
            return res.status(400).json({message : 'User already exists' , code : 'authCode1'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        
        try{
            await pgPool.query('INSERT INTO public."User" (email, password , name) VALUES ( $1 , $2 , $3 )' , [email , hashedPassword , name])
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
        const isMatch = await bcrypt.compare(password , user.rows[0].password)
        if(user.rowCount == 1 && isMatch){
            const userName = user.rows[0].name
            const userEmail = user.rows[0].email
            const payLoad = {name : userName , email : userEmail}
            try{
                // sign with jwt 
                const access_token = jwt.sign(payLoad , process.env.SECRET_KEY , {expiresIn : '1h'})
                customLogger.info('cookie set' , 'auth')
                res.cookie('access_token' , access_token , {httpOnly : true})
                return res.status(200).json({message : 'Login Successful'})
            }catch(err){
                console.log('Error in signing jwt : ' , err)
                customLogger.error(err , 'auth')
                return res.status(500).json({message : "Error in signing jwt"})
            }
        }else{
            customLogger.error(err , 'auth')
            return res.status(400).json({message : 'User does not exists' , 'code' : 'loginCode1'})
        }

    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'auth')
        return res.status(500).json({message : 'auth Login server error'})
    }
}

const logout = async(req , res) => {
    res.status(200).json({message : 'inside logout'})
}

const refreshToken = async(req , res) => {
    res.status(200).json({message : 'inside refresk token controller'})
}

const updatePassword = async(req, res) => {
    const {userid , password} = req.body
    console.log(userid)
    console.log(password)
    try{
        const user = await pgPool.query('SELECT * FROM public."User" WHERE userid = $1' , [userid])
        console.log(user)
        if(user.rowCount == 1){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            try{
                const updateResponse = await pgPool.query('UPDATE public."User" SET password = $1 WHERE userid = $2' , [hashedPassword , userid])
                console.log(updateResponse)
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