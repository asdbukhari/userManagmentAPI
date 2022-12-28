const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");

router.use("/a", authRoutes); //auth routes

module.exports = router;
