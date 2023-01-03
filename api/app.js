const express = require("express");

const hostname = "0.0.0.0";
const port = 8080;

const server = express();
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://prams:prams@cluster0.llp9m.mongodb.net/apinode?authSource=admin&replicaSet=atlas-9q6q4j-shard-0&readPreference=primary&ssl=true")
	.then(() => console.log("Connexion à MongoDB réussie !"));
//mongoose.connect("mongodb://mongo/apinode");

//cors pour autoriser les requetes de n'importe quelle origine
const cors = require("cors");
server.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	}),
);

server.use(express.urlencoded());
server.use(express.json());

const postRoute = require("./src/routes/postRoute");
postRoute(server);

const commentRoute = require("./src/routes/commentRoute");
commentRoute(server);

const userRoute = require("./src/routes/userRoute");
userRoute(server);

server.listen(port, hostname);
