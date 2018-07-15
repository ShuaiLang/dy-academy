// prod.js
// DO COMMIT THIS FILE
// these keys (process.env...) are setup on heroku - setting - config var
// these keys would be pulled from Heroku env variable.
module.exports = {
	mongoURI: process.env.MONGO_URI,
	sessionKey: process.env.SESSION_KEY,
	alipayAppId: process.env.ALIPAY_APP_ID,
	alipayPrivateKey: process.env.ALIPAY_PRIVATE_KEY,
	alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY
};