const jwtMiddleware = require("../middlewares/jwtMiddleware");

module.exports = (server) => {
	const userController = require("../controllers/userController");

	server.post("/user/register", userController.userRegister);
	server.post("/user/login", userController.loginRegister);
	server.get("/user/me", jwtMiddleware.verifyToken, userController.me);
};
