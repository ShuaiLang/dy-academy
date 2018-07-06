// const allCourses = require('../assets/allCourses.json');
const Courses = require('../models/course');
module.exports = (app) => {
	// get all courses
	app.get('/api/course/all', function(req, res, next) {
		Courses.find(function (err, courses) {
			if(err)
				return next(err);
			res.json(courses);
		});
	});

	// get single course by ID
	app.get('/api/course/:id', function(req, res, next) {
		Courses.findById(req.params.id, function(err, course) {
			if(err)
				return next(err);
			res.json(course);
		});
	});

	// save course
	app.post('/api/course/save', function(req, res, next) {
		Courses.create(req.body, function(err, course) {
			if(err) return next(err);
			res.json(course);
		});
	});

	// update course
	app.put('/api/course/update/:id', function(req, res, next) {
		Courses.findByIdAndUpdate(req.params.id, req.body, function(err, course) {
			if(err) return next(err);
			res.json(course);
		});
	});

	// delete course
	app.delete('/api/course/delete/:id', function(req, res, next) {
		Courses.findByIdAndRemove(req.params.id, req.body, function(err, course) {
			if(err) return next(err);
			res.json(course);
		});
	});
}