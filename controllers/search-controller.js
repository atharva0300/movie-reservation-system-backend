const express = require('express')
const createPath = require('../shared/createPath')

const apiType = 'search'

const searchTermController = async(req , res) => {
    console.log('inside search controlller')
    const searchTerm = req.query.q
    console.log('searchterm : ' , searchTerm)
    console.log('rqepath : ' , req.path)
    const pathObj = {
        reqPath : req.path,
        apiType,
        query : searchTerm
    }
    const newPath = createPath(pathObj)
    console.log('new path outside : ',  newPath)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            }
        })
        const data = await response.json();

        return res.status(response.status).json({message : 'found' , data })
    }catch(err){
        return res.status(500).json({message : 'searchTerm in main server error'})
    }
}

module.exports = {searchTermController}