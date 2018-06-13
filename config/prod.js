// prod.js
// DO COMMIT THIS FILE
// these keys (process.env...) are setup on heroku - setting - config var
// these keys would be pulled from Heroku env variable.
module.exports = {
	mongoURI: process.env.MONGO_URI
};