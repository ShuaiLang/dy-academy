if(process.env.NODE_ENV === 'production'){
	// in production env - return the prod set of keys
	module.exports = require('./prod');
} else {
	// in dev env - return dev keys
	module.exports = require('./dev');
}
