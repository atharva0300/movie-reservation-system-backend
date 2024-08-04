const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../.env')})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI.toString());

/*
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

module.exports = client
