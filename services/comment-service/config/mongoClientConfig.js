const { MongoClient } = require('mongodb');
const path = require('path')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI.toString());

module.exports = client
