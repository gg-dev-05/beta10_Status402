const { Schema, model } = require("mongoose");

const inventorySchema = new Schema(
	{
		crop: { type: String, required: true },
		quantity: { type: Number, default: 0 },
		units: { type: String, default: "kg" },
		price: { type: Number, default: 0 },
		farmerId: { type: Schema.Types.ObjectId, ref: "Farmer" },
	},
	{
		timestamps: true,
	}
);

const Inventory = model("Inventory", inventorySchema);

module.exports = Inventory;
