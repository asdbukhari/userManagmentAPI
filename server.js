const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const useragent = require("express-useragent");
const rateLimit = require("express-rate-limit");

const { window, max_limit, port } = require("./config");
const pjson = require("./package.json");
const connect = require("./utils/connectDb");
const allRoutes = require("./routes");

connect();
const app = express();

const limiter = rateLimit({
	windowMs: window * 1000,
	max: max_limit,
	message: `Too many requests to this end-point, please try again after ${window} seconds`,
});

app.set("trust proxy", 1);
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(useragent.express());
app.use(limiter);

app.use("/api", allRoutes);

app.listen(port);

app.use((req, res) => {
	res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`--------------------------------------------------------------`);
console.log(`Server started on port ${port} (version:${pjson.version})`);
console.log(`--------------------------------------------------------------`);
