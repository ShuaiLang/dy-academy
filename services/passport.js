// const passport = require('passport');
const User = require("../models/user");
const localStrategy = require('passport-local');

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // create the user
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.encryptPassword(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));

};


// passport.use('local-signup', new localStrategy({
// 		usernameField: 'email',
// 		passwordField: 'password',
// 		passReqToCallback: true
// 	}, function(req, email, password, done) {
// 		req.checkBody('email', 'invalid email').notEmpty().isEmail();
// 		req.checkBody('password', 'invalid password').notEmpty().isLength({ min: 6});
// 		var errors = req.validationErrors();
// 		if(errors) {
// 			var messages = [];
// 			errors.forEach(err => {
// 				messages.push(err.msg)
// 			});
// 			return done(null, false, req.flash('error', messages));
// 		}
// 		User.findOne({ email }, (err, user) => {
// 			if(err) {
// 				return done(err);
// 			}
// 			if(user) {
// 				return done(null, false, {message: "used email"});
// 			}
// 			var newUser = new User();
// 			newUser.email = email;
// 			newUser.password = newUser.encryptPassword(password);
// 			newUser.save(function(err, result) {
// 				if(err) {
// 					return done(err);
// 				}
// 				return done(null, newUser);
// 			});
// 		});
// 	}
// ));

// passport.use('local-login', new localStrategy({
// 		usernameField: 'email',
// 		passwordField: 'password',
// 		passReqToCallback: true
// 	}, function(req, email, password, done) {
// 		req.checkBody('email', 'invalid email').notEmpty().isEmail();
// 		req.checkBody('password', 'invalid password').notEmpty().isLength({ min: 6});
// 		var errors = req.validationErrors();
// 		if(errors) {
// 			var messages = [];
// 			errors.forEach(err => {
// 				messages.push(err.msg)
// 			});
// 			return done(null, false, req.flash('error', messages));
// 		}
// 		User.findOne({ email }, (err, user) => {
// 			if(err) {
// 				return done(err);
// 			}
// 			if(!user) {
// 				return done(null, false, {message: "wrong email"});
// 			}
// 			if(!user.validPassword(password)) {
// 				return done(null, false, {message: "wrong password"});
// 			}
// 			return done(null, user);
// 		});
// 	}
// ));