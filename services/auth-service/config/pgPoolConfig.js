const path = require('path')
const {Pool : pgPool} = require('pg')

console.log(process.env.PG_USER)

const pool = new pgPool({
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    host : process.env.PG_DOCKER_HOST,
    port : process.env.PG_PORT,
    database : process.env.PG_DATABASE
})

module.exports = pool