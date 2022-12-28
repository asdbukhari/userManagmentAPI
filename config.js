const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	window: process.env.WINDOW,
	max_limit: process.env.MAX_LIMIT,
	port: process.env.PORT || 8000,
	mongo_string: process.env.MONGO,
};
