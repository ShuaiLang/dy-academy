const allCourses = require('../assets/allCourses.json');

module.exports = (app) => {
	app.get('/api/get_all_courses', function(req, res) {
		res.send(allCourses.courses);
	});
}