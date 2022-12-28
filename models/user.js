const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
	{
		user_name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		first_name: { type: String },
		last_name: { type: String },
		role: {
			type: String,
			enum: ["Admin", "User"],
			required: true,
			default: "User",
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.plugin(uniqueValidator);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
