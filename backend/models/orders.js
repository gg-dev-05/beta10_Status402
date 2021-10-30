const { Schema, model } = require("mongoose");

const ordersSchema = new Schema(
	{
		farmer: { type: Schema.Types.ObjectId, ref: "Farmer" },
		itemId: { type: Schema.Types.ObjectId, ref: "Inventory" },
		quantity: { type: Number, default: 0 },
		units: { type: String, default: "kg" },
		price: { type: Number, default: 0 },
		// 0 - pending, 1 - confirmed
		status: { type: Number, default: 0 },
		consumerName: { type: String, default: "" },
		consumerEmail: { type: String, default: "" },
		consumerPhone: { type: Number, default: null },
	},
	{
		timestamps: true,
	}
);

const Orders = model("Orders", ordersSchema);

module.exports = Orders;
