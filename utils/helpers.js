const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { default: jwtDecode } = require("jwt-decode");

module.exports = {
	hashPassword: password => {
		const salt = bcryptjs.genSaltSync(10);
		const passwordHashed = bcryptjs.hashSync(password, salt);
		return passwordHashed;
	},

	comparePassword: (plainPassword, hashedPassword) =>
		bcryptjs.compareSync(plainPassword, hashedPassword),

	generateToken: payload => {
		const token = jwt.sign(payload, "hello", {
			expiresIn: "1 day",
			algorithm: "HS512",
		});
		return token;
	},

	decryptToken: token => {
		const decrypted = jwtDecode(token);
		const iat = new Date(decrypted.iat * 1000);
		const exp = new Date(iat.getTime() + 30 * 60000);
		return {
			iat: iat,
			exp: exp,
		};
	},
};
