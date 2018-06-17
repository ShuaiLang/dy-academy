// const passport = require('passport');

module.exports = (app, passport) => {
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // SIGNUP ==============================
	app.get('/signup', (req, res) => {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', 
            failureRedirect : '/signup', 
            failureFlash : true // allow flash messages
        })
	);

	// LOGIN ==============================
	app.get('/login', (req, res) => {
		res.render('login.ejs', { message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/',
			failureFlash: true
		})
	);


	app.get('/api/current_user', (req, res) => {
		res.send(req.user); // lecture 42. passport automatically attach this user to the request body.
	});
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
