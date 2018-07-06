const express = require('express');
const validator = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');
// const cookieSession = require('cookie-session');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./models/user');

const keys = require('./config/keys');

const app = express();

//connect to mongo
mongoose.connect(keys.mongoURI);
require('./services/passport')(passport);
// app.use weirs up middleware.
app.use('/static', express.static(__dirname + '/assets'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// let express instance know about cookiesession.
// app.use( 
// 	cookieSession({
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 		keys: [keys.cookieKey]
// 	})
// );
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
// these two lines tells passport to 
// use cookies to handle authentications.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/authRoutes')(app, passport);
require('./routes/coursesRoutes')(app);

// these lines run in prod mode
if(process.env.NODE_ENV === 'production') {
	// Express will serve production assets
	app.use(express.static('client/build'));
	// if not found in 'client/build' then 
	// Express will serve index.html file if the path is not defined in Express
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}


//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine.
app.listen(PORT);