const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../.env')})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI.toString());

module.exports = client
