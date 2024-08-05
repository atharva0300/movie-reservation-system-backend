const express = require('express')
const createPath = require('../shared/createPath')

const apiType = 'booking'

const bookBulkTicketController = async(req , res) => {
    console.log('inside bookBuldTicketController')
    console.log(req.body)
    const pathObj = {
        reqPath : req.path,
        apiType
    }
    const newPath = createPath(pathObj)
    console.log('new path : ' , newPath)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json();
        console.log('data : ' , data)

        return res.status(response.status).json({message : data?.message})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : 'boolBulkTicketController Error'})
    }
}  


module.exports = {bookBulkTicketController}