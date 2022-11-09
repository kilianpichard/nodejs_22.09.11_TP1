const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = (req, res) => {
	bcrypt.hash(req.body.password, 10, (error, hash) => {
		if (error) {
			return res.status(500).json({
				error: error,
			});
		} else {
			req.body.password = hash;
			const user = new User(req.body);

			user.save((error, user) => {
				if (error) {
					return res.status(500).json({
						error: error,
					});
				} else {
					return res.status(201).json({
						message: "User created successfully",
					});
				}
			});
		}
	});
};

exports.loginRegister = (req, res) => {
	User.findOne({ email: req.body.email }, (error, user) => {
		if (error) {
			return res.status(500).json({
				error: error,
			});
		} else if (user) {
			bcrypt.compare(req.body.password, user.password, (error, result) => {
				if (error) {
					return res.status(401).json({
						error: error,
					});
				} else if (result) {
					const token = jwt.sign(
						{
							email: user.email,
							userId: user._id,
							role: user.role,
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h",
						},
					);

					return res.status(200).json({
						message: "Auth successful",
						token: token,
					});
				} else {
					return res.status(401).json({
						message: "Password incorrect",
					});
				}
			});
		} else {
			return res.status(404).json({
				message: "User not found",
			});
		}
	});
};

exports.me = (req, res) => {
	// get the token from the request
	const token = req.headers.authorization;
	// decode the token
	const decoded = jwt.verify(token, process.env.JWT_KEY);
	// get the user id from the decoded token
	const userId = decoded.userId;
	// find the user by id
	User.findById(userId, (error, user) => {
		if (error) {
			return res.status(500).json({
				error: error,
			});
		} else if (user) {
			return res.status(200).json({
				email: user.email,
				role: user.role,
			});
		} else {
			return res.status(404).json({
				message: "User not found",
			});
		}
	});
};
