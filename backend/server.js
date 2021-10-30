const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const farmerRouter = require("./routes/farmer");
const consumerRouter = require("./routes/consumer");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection established successfully");
});

app.use("/", indexRouter);
app.use("/farmer", farmerRouter);
app.use("/consumer", consumerRouter);

app.use((req, res) => {
	res.status(200).json({ statusCode: 404, message: "URL not found" });
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
