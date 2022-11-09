const express = require("express");

const hostname = "0.0.0.0";
const port = 8080;

const server = express();
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/apinode")
	.then(() => console.log("Connexion à MongoDB réussie !"));
//mongoose.connect("mongodb://mongo/apinode");

server.use(express.urlencoded());
server.use(express.json());

const postRoute = require("./src/routes/postRoute");
postRoute(server);

const commentRoute = require("./src/routes/commentRoute");
commentRoute(server);

const userRoute = require("./src/routes/userRoute");
userRoute(server);

server.listen(port, hostname);
