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
	message: {
		type: String,
		required: true
	},
	tags: [{
		type: String
	}]
})

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;