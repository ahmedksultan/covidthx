const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
	}
})

CardSchema.plugin(mongoosePaginate);

const Card = mongoose.model("Card", CardSchema);

Card.paginate({}, { offset: 1, limit: 50 }).then(function(result) {
	
});

module.exports = Card;
