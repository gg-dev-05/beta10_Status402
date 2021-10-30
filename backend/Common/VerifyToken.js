const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyTokenFarmer(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		// console.log(token);
		const decoded = jwt.verify(token, process.env.PRIVATE_KEY_FARMERS);
		// console.log(decoded);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(200).json({ statusCode: 403, message: "Access forbidden" });
	}
}

function verifyTokenConsumer(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		// console.log(token);
		const decoded = jwt.verify(token, process.env.PRIVATE_KEY_CONSUMERS);
		// console.log(decoded);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(200).json({ statusCode: 403, message: "Access forbidden" });
	}
}

module.exports = { verifyTokenFarmer, verifyTokenConsumer };
