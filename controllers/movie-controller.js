const express = require('express')
const createPath = require('../shared/createPath')

const apiType = 'movies'


// get all the moivies
const getAllMovies = async (req , res) => {
    const params = req.params;
    console.log('reqpaht in getall moves : ' , req.path)    
    const pathObject = {
        reqPath : req.path,
        apiType : 'movies'
    }
    const newPath = createPath(pathObject)
    console.log('movies path ; ' , newPath)
        try{
            const response =  await fetch(newPath , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await response.json()
            return res.status(response.status).json({message : data.message})
        }catch(err){
            console.log('err : ' , err)
            return res.status(500).json({message : 'getAllMovies error'})
        }
}

// add a new movie 
const addSingleMovie = async(req , res) => {
    console.log(req.body)
    const newPath = createPath(req.path)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : req.body
        })
        const data = await response.json();
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// get movie details by id
const getSingleMovie = async(req , res) => {
    console.log(req.params)
    const pathObject = {
        reqPath : req.path,
        apiType,
    }
    const newPath =  createPath(pathObject)
    console.log('newPath : ' , newPath)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json();
        console.log(Object.keys(result.data))
        if(result){
            return res.status(response.status).json({message : result.message , data : result.data})    
        }

        return res.status(response.status).json({message : 'movie not found'})

    }catch(err){
        console.log('err : ' , err)
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// update movie details
const updateSingleMovie = async(req , res) => {
    console.log(req.body)
    const newPath =  createPath(req.path)
    try{
        const response = await fetch(newPath , {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : req.body
        })
        const data = await response.json();
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// delete single movie
const deleteSingleMovie = async(req , res) => {
    console.log(req.body)
    const newPath =  createPath(req.path)
    try{
        const response = await fetch(newPath , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : req.body
        })
        const data = await response.json();
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        return res.status(500).json({message : 'allNewMovie error'})
    }
}


module.exports = {getAllMovies , getSingleMovie , addSingleMovie , updateSingleMovie , deleteSingleMovie}



