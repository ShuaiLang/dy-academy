// const passport = require('passport');

module.exports = (app, passport) => {
	app.get('/', (req, res) => {
		res.send({hi: 'there'});
	});

	app.get('/signup', (req, res) => {
		res.render('signup.ejs', { message: req.flash('loginMessage') });
	})

	app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/signup', 
            failureRedirect : '/', 
            failureFlash : true // allow flash messages
        }));

	app.post('/login', passport.authenticate('local-login',
		(req, res) => {
			res.redirect('/');
		}
	));

	app.get('/api/current_user', (req, res) => {
		res.send(req.user); // lecture 42. passport automatically attach this user to the request body.
	});
}