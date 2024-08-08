const imdbTitleIds = [
  // Hindi Movies
  'tt3576728', // Bajrangi Bhaijaan
  'tt7616538', // Andhadhun
  'tt8228288', // Gully Boy
  'tt3450958'  // Queen
];


// const mongoClient = require('../config/mongoClientConfig')
const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(process.env.MONGO_URI.toString());

// const url = 'https://imdb146.p.rapidapi.com/v1/title/?id=tt0087884';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'c2ee5a3047msh5e7286b9f94796dp10b74djsnedbc3cd2ea56',
    'x-rapidapi-host': 'imdb146.p.rapidapi.com'
  }
};

const makeReq = async(req , res) => {
    try {

        for(i in imdbTitleIds){
          const titleid = imdbTitleIds[i]
          const url = `https://imdb146.p.rapidapi.com/v1/title/?id=${titleid}`
          const response = await fetch(url, options);
          const data = await response.json();

          const movieObject = {
            id : data.id,
            titleText : data.titleText.text,
            releaseYear : data.releaseYear.year,
            releaseDate : {
              day : data.releaseDate.day,
              month : data.releaseDate.month,
              year : data.releaseDate.year
            },
            runtime : data.runtime == null ? -1 : data.runtime.seconds,
            metascore : data.metacritic == null ? -1 : data.metacritic.metascore.score,
            plot : {
              plotText : data.plot == null ? 'no plot available' : data.plot.plotText.plainText,
              language : 'Hindi'
            },
            isAdult : data.isAdult,
            criticReviews : data.criticReviews,
            countriesOfOrigin : data.countriesOfOrigin,
            production : data.production,
            productionBudget : data.productionBudget
          }

          const castObj = {
            cast : data.cast,
            movieId : data.id
          }

          const directorsObj = {
            director : data.directors,
            movieId : data.id
          }

          const genresObj = {
            genre : data.genres,
            movieId : data.id
          }

          const trailerGalleryObj = {
            movieId : data.id,
            video : data.videoStrip
          }

          const reviewsObj = {
            reviews : data.reviews,
            movidId : data.id
          }

          const commentsObj = {
            movidId : data.id,
            comments : {}
          }
        
        
        const database = mongoClient.db(process.env.MOVIE_RESERVATION_DB)

        const movieCollection = database.collection('movie_info')
        const castCollection = database.collection('cast')
        const directorCollection = database.collection('director')
        const genresCollection = database.collection('genre')
        const trailerGalleryCollection = database.collection('trailer_gallery')
        const reviewsCollection = database.collection('review')
        const commentsCollection = database.collection('comment')

        const result1 = await movieCollection.insertOne(movieObject)
        console.log('movie : ' , result1)

        const result2 = await castCollection.insertOne(castObj)
        console.log('cast : ' , result2)

        const result3 = await directorCollection.insertOne(directorsObj)
        console.log('directors obj : ' , result3)

        const result4 = await genresCollection.insertOne(genresObj)
        console.log('genres : ' , result4)

        const result5 = await trailerGalleryCollection.insertOne(trailerGalleryObj)
        console.log('trailer : ' , result5)

        const result6 = await reviewsCollection.insertOne(reviewsObj)
        console.log('review : ' , result6)

        const result7 = await commentsCollection.insertOne(commentsObj)
        console.log('review : ' , result7)

        
      }
      mongoClient.close()

        
    } catch (error) {
        console.error(error);
    }
}

async function makeDummyReq(){
  await mongoClient.connect()
  db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
  const movieCollection = db.collection('movie_info')
  const result = await movieCollection.find({}).toArray()
  console.log('result : ' , result)
  mongoClient.close()
}

makeDummyReq()

// makeReq()