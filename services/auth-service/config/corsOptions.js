const allowedOrigins = ['http://localhost:3000' , 'http://mrs-api-gateway-app-1:3000']

const corsOptions = {
    origin : (origin , callback) => {
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null , true)
        }else{
            callback(new Error('not allowed by CORS'))
        }
    },
    optionsSuccessStories : 200
}

module.exports = corsOptions