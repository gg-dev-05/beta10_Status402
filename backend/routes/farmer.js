const router = require("express").Router();
const { validateParams } = require("../Common/Validate");
const Farmer = require("../models/farmer");
const jwt = require("jsonwebtoken");
const { verifyTokenFarmer } = require("../Common/VerifyToken");

require("dotenv").config();

// router.route("/").get(async (req, res) => {
// 	try {
// 		const result = await Farmer.find();
// 		res.status(200).json({ statusCode: 200, message: "fetched farmers' list", result });
// 	} catch (err) {
// 		res.status(200).json({ statusCode: 500, message: err.message });
// 	}
// });

router.route("/farmer").get(verifyTokenFarmer, async (req, res) => {
	try {
		const result = await Farmer.findById(req.user._id);
		res.status(200).json({ statusCode: 200, message: "fetched farmer's details", result });
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

router.route("/add").post(async (req, res) => {
	try {
		if (!validateParams([req.body.username, req.body.password])) {
			res.status(200).json({ statusCode: 400, message: "Params missing, username and password required" });
		} else {
			const newFarmer = new Farmer(req.body);
			const result = await newFarmer.save();
			res.status(200).json({ statusCode: 200, message: "added farmer", result });
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

router.route("/login").post(async (req, res) => {
	try {
		if (!validateParams([req.body.username, req.body.password])) {
			res.status(200).json({ statusCode: 400, message: "Params missing, username and password required" });
		} else {
			const farmer = await Farmer.findOne({ username: req.body.username });
			if (farmer && req.body.password === farmer.password) {
				var token = jwt.sign({ _id: farmer._id, username: farmer.username }, process.env.PRIVATE_KEY_FARMERS);
				res.status(200).json({ statusCode: 200, message: "authenticated", token });
			} else {
				res.status(200).json({ statusCode: 403, message: "incorrect username or password" });
			}
		}
	} catch (err) {
		res.status(200).json({ statusCode: 500, message: err.message });
	}
});

module.exports = router;
