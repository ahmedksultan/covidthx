const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
	name: {
		type: String
	},
	location: {
		type: String
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