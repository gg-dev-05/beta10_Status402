const { Schema, model } = require("mongoose");

const consumerSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		location: {
			lat: { type: Number, default: 0 },
			lng: { type: Number, default: 0 },
		},
	},
	{
		timestamps: true,
	}
);

const Consumer = model("Consumer", consumerSchema);

module.exports = Consumer;
