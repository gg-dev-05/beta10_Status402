const { Schema, model } = require("mongoose");

const ordersSchema = new Schema(
	{
		farmer: { type: Schema.Types.ObjectId, ref: "Farmer" },
		consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
		items: {
			type: [
				{
					itemId: { type: Schema.Types.ObjectId, ref: "Inventory" },
					quantity: { type: Number, default: 0 },
					units: { type: String, default: "kg" },
					price: { type: Number, default: 0 },
				},
			],
			default: [],
		},
		price: { type: Number, default: 0 },
		// 0 - pending, -1 - cancelled, 1 - confirmed, 2 - delivered
		status: { type: Number, default: 0 },
		discount: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Orders = model("Orders", ordersSchema);

module.exports = Orders;
