const User = require('../models/user');

module.exports = (app, passport) => {

    // PROFILE ============================
	app.get('/api/profile', (req, res) => {
		res.send(req.user || false); // lecture 42. passport automatically attach this user to the request body.
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
	
	// LOGOUT ==============================
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
	
    // IS LOGGED IN ============================
    app.get('/api/isloggedin', (req, res) => {
    	res.send(req.isAuthenticated());
    });

	app.post('/api/user/addtocart', redirectIfNotLoggedIn, (req, res) => {
		console.log('addtocart route got: ', req.body.item, req.body.user);
		const item = req.body.item;
		const user = req.body.user;
		User.findById(user._id, async(err, user) => {
			if(err) {
				console.log('mongo query err find user: ', err);
				res.send(false);
			}
			else {
				user.shoppingCart = Array.from(new Set([...user.shoppingCart, item]));
				const newUser = await user.save();
				console.log('adding course to user shoppingCart success!!');
				res.send(user.shoppingCart);
			}
		})
	});

	// app.post('/api/user/addtocart', (req, res) => {
	// 	if(!req.user) {
	// 		console.log('not logged in!!');
	// 		res.redirect(307, '/login');
	// 	} else {
	// 		console.log('going to next');
	// 		next();
	// 	}
	// }, (req, res) => {
	// 	console.log('is logged in! next!!');
	// });

	// PURCHASED COURSE(S) ================
	app.get('/api/user/purchased', function(req, res, next) {
		res.send(req.user.purchasedCourses);
	});

	// WISHLIST COURSE(S) =================
	app.get('/api/user/wishlist', redirectIfNotLoggedIn, function(req, res, next) {
		res.send(req.user.wishList);
	});
}

function redirectIfNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
    	console.log('redirectIfNotLoggedIn: ', req.isAuthenticated())
		// stop the middleware chain right here, otherwise more error.
		// return res.status(403).redirect('./');//.send({ error: 'You must log in!'});
		res.redirect('/login');
	} else {
		console.log('require login: logged in');
		next();
	}
};