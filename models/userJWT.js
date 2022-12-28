const mongoose = require("mongoose");

const userJwt = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		token: { type: String },
		iat: { type: Date },
		exp: { type: Date },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const USER_JWT = mongoose.model("user_jwt", userJwt);

module.exports = USER_JWT;
