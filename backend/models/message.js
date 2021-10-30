const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
	{
		farmer: { type: Schema.Types.ObjectId, ref: "Farmer" },
		consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
		// 0 - farmer -> consumer, 1 - consumer -> farmer
		from: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Message = model("Message", messageSchema);

module.exports = Message;
