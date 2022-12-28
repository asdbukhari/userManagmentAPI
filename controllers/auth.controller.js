const { USER, ADMIN_JWT } = require("../models");

const {
	hashPassword,
	comparePassword,
	generateToken,
	decryptToken,
} = require("../utils/helpers");

exports.register = async (req, res) => {
	const { email, password } = req.body;

	let user = await USER.findOne({ email });

	if (user) {
		throw {
			code: 500,
			success: true,
			message: "User with this email already exists",
		};
	}

	const hashedPassword = hashPassword(password);

	user = await USER.create({
		...req.body,
		password: hashedPassword,
	});

	return res.status(200).send({
		code: 200,
		success: true,
		message: "User Created Successfully",
		created: user,
	});
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	let user = await USER.findOne({ email });

	if (!user || !comparePassword(password, user.password)) {
		throw {
			code: 404,
			success: true,
			message: "Email or password is incorrect",
		};
	}

	const token = generateToken({ email, id: user?._id });

	if (!token) {
		throw {
			code: 404,
			success: true,
			message: "error generating token",
		};
	}

	const decrypted = decryptToken(token);

	const a = await ADMIN_JWT.findOneAndUpdate(
		{ user_id: user?._id },
		{
			user_id: user?._id,
			token: token,
			iat: decrypted.iat,
			exp: decryptToken.exp,
		},
		{ upsert: true }
	);

	return res.status(200).send({
		code: 200,
		success: true,
		message: "SignIn Successfully",
		token,
		user,
	});
};
