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

    // ADD TO CART =============================
    // DON'T FORGET TO REDIRECT TO LOGIN 
	app.get('/api/user/addtocart/:courseId', (req, res) => {
		console.log('addtocart route got: ', req.params.courseId);
		const item = req.params.courseId;
		const user = req.user;
		User.findById(user._id, async (err, user) => {
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

	// UPDATE SHOPPING CART FROM ANONYMOUS ========================
	app.post('/api/user/update_from_anonymous', (req, res) => {
		console.log(req.body.items);
		if(req.user) {
			User.findById(req.user._id, async (err, user) => {
				if(err) {
					console.log(err);
				} else {
					user.shoppingCart = Array.from(new Set([...user.shoppingCart, ...req.body.items]));
					const newUser = await user.save();
					console.log('adding course from anonymous cart success!!!');
					res.send(user.shoppingCart);
				}
			});
		} else {
			res.send(false);
		}
	});

	// GET SHOPPING CART ========================
	app.get('/api/user/shopping-cart', redirectIfNotLoggedIn, (req, res) => {
		res.send(req.user.shoppingCart);
	});

	// REMOVE FROM CART ========================
	app.get('/api/user/shopping-cart/remove/:id', (req, res) => {
		if(req.user.shoppingCart.includes(req.params.id.toString())) {
			User.findById(req.user._id, async (err, user) => {
				if(err)
					console.log(err);
				else {
					var index = user.shoppingCart.indexOf(req.params.id);
					if(index > -1) {
						user.shoppingCart.splice(index, 1);
						await user.save();
						console.log(`removed ${req.params.id} from cart!!`);
						res.send(user.shoppingCart);
					}
				}
			});
		} else
			res.send(false);
	});

	

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