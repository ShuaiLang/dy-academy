// const passport = require('passport');

module.exports = (app, passport) => {
	// app.get('/', (req, res) => {
	// 	res.render('index.ejs');
	// });

	// PROFILE SECTION =========================
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     res.render('profile.ejs', {
    //         user : req.user
    //     });
    // });

    // LOGOUT ==============================
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // SIGNUP ==============================
	// app.get('/signup', (req, res) => {
	// 	res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });

	app.post('/api/signup', passport.authenticate('local-signup', {
            successRedirect : '/api/profile', 
            failureRedirect : '/signup', 
            failureFlash : true // allow flash messages
        })
	);

	// LOGIN ==============================
	// app.get('/login', (req, res) => {
	// 	res.render('login.ejs', { message: req.flash('loginMessage')});
	// });

	app.post('/api/login', passport.authenticate('local-login', {
			successRedirect: '/api/profile',
			failureRedirect: '/login',
			failureFlash: true
		})
	);


	app.get('/api/profile', (req, res) => {
		res.send(req.user); // lecture 42. passport automatically attach this user to the request body.
	});
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
