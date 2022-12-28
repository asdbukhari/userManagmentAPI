const mongoose = require("mongoose");

const { mongo_string } = require("../config");

const connect = () => {
	mongoose.Promise = global.Promise;
	mongoose
		.connect(mongo_string)
		.then(() => console.log("MongoDB connected"))
		.catch(err => console.log(err));
};

module.exports = connect;
