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
	app.post('/api/signup', passport.authenticate('local-signup', {
            successRedirect : '/', 
            failureRedirect : '/signup', 
            failureFlash : true // allow flash messages
        })
	);

	// LOGIN ==============================
	app.post('/api/login', passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})
	);

	// PROFILE ============================
	app.get('/api/profile', (req, res) => {
		res.send(req.user); // lecture 42. passport automatically attach this user to the request body.
	});

	// PURCHASED COURSE(S) ================
	app.get('/api/user/purchased', isLoggedIn, function(req, res, next) {
		res.send(req.user.local.purchasedCourses);
	});

	// WISHLIST COURSE(S) =================
	app.get('/api/user/wishlist', isLoggedIn, function(req, res, next) {
		res.send(req.user.local.wishList);
	});
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(null);
    // res.redirect('/');
};
