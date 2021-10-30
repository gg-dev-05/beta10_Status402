const router = require("express").Router();
const { validateParams } = require("../Helpers/Validate");
const Farmer = require("../models/farmer");

router.route("/").get(async (req, res) => {
	try {
		const result = await Farmer.find();
		res.status(200).json({ statusCode: 200, message: "fetched farmers' list", result });
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

module.exports = router;
