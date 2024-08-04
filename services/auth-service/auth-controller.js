const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// pgclient 
const pgPool = require('../../config/pgPoolConfig')

const register = async(req , res) => {
    console.log('reqbody : ' , req.body)
    const {name , email , password } = req.body

    try{
        const existingUser = await pgPool.query('SELECT * FROM public."User" WHERE email = $1' , [email])
        if(existingUser.rowCount!=0){
            return res.status(400).json({message : 'User already exists' , code : 'authCode1'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        
        try{
            // insert into User table ( SQL )
            await pgPool.query('INSERT INTO public."User" (email, password , name) VALUES ( $1 , $2 , $3 )' , [email , hashedPassword , name])
            res.status(201).json({message : 'User registered successully'})
        }catch(err){
            res.status(500).json({message : 'DB error'})
        }
    }catch(err){
        console.log('err : ' , err)
        res.status(500).json({message : 'Auth Register server error'})
    }
} 

const login = async(req , res) => {
    const {email , password} = req.body
    console.log(email , password)
    try{
        const user = await pgPool.query('SELECT * FROM public."User" WHERE email = $1' , [email])
        const isMatch = await bcrypt.compare(password , user.rows[0].password)
        if(user.rowCount == 1 && isMatch){
            const userName = user.rows[0].name
            const userEmail = user.rows[0].email
            console.log(userName)
            console.log(userEmail)
            const payLoad = {name : userName , email : userEmail}
            try{
                // sign with jwt 
                const access_token = jwt.sign(payLoad , process.env.SECRET_KEY , {expiresIn : '1h'})
                res.cookie('access_token' , access_token , {httpOnly : true})
                return res.status(200).json({message : 'Login Successful'})
            }catch(err){
                console.log('Error in signing jwt : ' , err)
                return res.status(500).json({message : "Error in signing jwt"})
            }
        }else{
            return res.status(400).json({message : 'User does not exists' , 'code' : 'loginCode1'})
        }

    }catch(err){
        console.log('err : ' , err)
        return res.status(500).json({message : 'auth Login server error'})
    }
}

const logout = async(req , res) => {
    res.status(200).json({message : 'inside logout'})
}

const refreshToken = async(req , res) => {
    res.status(200).json({message : 'inside refresk token controller'})
}

module.exports = {register , login , logout , refreshToken}