const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	hearts: {
		type: Number,
		default: 0,
		required: true
	},
	reported: {
		type: Boolean,
		default: false,
		required: true
	},
	img: {
		type: String
	}
})

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
