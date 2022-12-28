const express = require("express");
require("express-group-routes");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const tryCatch = require("../utils/tryCatch");

router.group("/v1", router => {
	router.post("/register", tryCatch(authController.register));
	router.post("/signin", tryCatch(authController.signin));
});

module.exports = router;
