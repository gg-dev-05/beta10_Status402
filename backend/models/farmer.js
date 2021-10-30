const { Schema, model } = require("mongoose");

const farmerSchema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Farmer = model("Farmer", farmerSchema);

module.exports = Farmer;
