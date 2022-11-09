const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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


}

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
						},
						"secret",
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

                    }
                    else {
                        res.status(200);
                        res.json({token});
                    }
                })
            }
            else {
                // Password don't match
                res.status(401);
                console.log(error);
                res.json({ message: "Email ou Mot de passe incorrect" });

            }
        }
    })
}