const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	Name: String,
	Description: String,
	ImgUrl: String,
	Tags: Array,
	Stars: Number,
	Price: Number
});

module.exports = mongoose.model('Course', courseSchema);