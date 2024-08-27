const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../.env')})
const {Pool : pgPool} = require('pg')

const pool = new pgPool({
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    host : process.env.PG_HOST,
    port : process.env.PG_PORT,
    database : process.env.PG_DATABASE
})

module.exports = pool