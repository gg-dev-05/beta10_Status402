const router = require("express").Router();
const { validateParams } = require("../Common/Validate");
const Consumer = require("../models/consumer");
const Farmer = require("../models/farmer");
const Inventory = require("../models/inventory");
const Orders = require("../models/orders");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const { verifyTokenConsumer } = require("../Common/VerifyToken");

require("dotenv").config();

// get consumer profile details
router.route("/details").get(verifyTokenConsumer, async (req, res) => {
	try {
		const result = await Consumer.findById(req.user._id);
		res.status(200).json({ statusCode: 200, message: "fetched consumer's details", result });
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// change password
router.route("/changePassword").post(verifyTokenConsumer, async (req, res) => {
	try {
		if (!validateParams([req.body.oldPassword, req.body.newPassword])) {
			res.status(200).json({ statusCode: 400, message: "Params missing" });
		} else {
			const consumer = await Consumer.findById(req.user._id);
			if (consumer.password == req.body.oldPassword) {
				consumer.password = req.body.newPassword;
				const result = await consumer.save();
				res.status(200).json({ statusCode: 200, message: "changed password", result });
			} else {
				res.status(200).json({ statusCode: 403, message: "incorrect password" });
			}
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// consumer register
router.route("/add").post(async (req, res) => {
	try {
		if (!validateParams([req.body.username, req.body.password])) {
			res.status(200).json({ statusCode: 400, message: "Params missing, username and password required" });
		} else {
			const newConsumer = new Consumer(req.body);
			const result = await newConsumer.save();
			res.status(200).json({ statusCode: 200, message: "added consumer", result });
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// consumer login
router.route("/login").post(async (req, res) => {
	try {
		if (!validateParams([req.body.username, req.body.password])) {
			res.status(200).json({ statusCode: 400, message: "Params missing, username and password required" });
		} else {
			const consumer = await Consumer.findOne({ username: req.body.username });
			if (consumer && req.body.password === consumer.password) {
				var token = jwt.sign(
					{ _id: consumer._id, username: consumer.username },
					process.env.PRIVATE_KEY_CONSUMERS
				);
				res.status(200).json({ statusCode: 200, message: "authenticated", token });
			} else {
				res.status(200).json({ statusCode: 403, message: "incorrect username or password" });
			}
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// get inventory details
router.route("/inventory").get(verifyTokenConsumer, async (req, res) => {
	try {
		const result = await Inventory.find().populate("farmerId");
		res.status(200).json({ statusCode: 200, message: "fetched items", result });
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// get order details
router.route("/order").get(verifyTokenConsumer, async (req, res) => {
	try {
		const result = await Orders.find({ consumer: req.user._id });
		res.status(200).json({ statusCode: 200, message: "fetched orders", result });
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// get messages
router.route("/message").get(verifyTokenConsumer, async (req, res) => {
	try {
		const result = await Message.find({ consumer: req.user._id }).populate("farmer");
		res.status(200).json({ statusCode: 200, message: "fetched messages", result });
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

// send message
router.route("/message/send").post(verifyTokenConsumer, async (req, res) => {
	try {
		if (!validateParams([req.body.farmer, req.body.message])) {
			res.status(200).json({ statusCode: 400, message: "Params missing" });
		} else {
			const farmer = await Farmer.findById(req.body.farmer);
			if (farmer) {
				const message = new Message({ ...req.body, from: 1 });
				const result = await message.save();
				res.status(200).json({ statusCode: 200, message: "sent messages", result });
			} else {
				res.status(200).json({ statusCode: 404, message: "farmer not found" });
			}
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

module.exports = router;
