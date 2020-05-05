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
		default: Date.now
	},
	message: {
		type: String,
		required: true
	},
	reported: {
		type: Boolean,
		default: false
	}
})

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
