const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.userRegister = (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error: error
            });
        } else {
            req.body.password = hash;
            const user = new User(req.body);

            user.save((error, user) => {
                if (error) {
                    return res.status(500).json({
                        error: error
                    });
                } else {
                    return res.status(201).json({
                        message: "User created successfully"
                    });
                }
            });
        }
    });
};


}

exports.loginRegister = (req, res) => {
	// Find user
	User.findOne({ email: req.body.email }, (error, user) => {
		// If user not found
		if (error) {
			res.status(500);
			console.log(error);
			res.json({ message: "Utilisateur non trouvé" });
		} else {
			// User found
			if (user.email === req.body.email && user.password === req.body.password) {
				// Password correct
				let userData = {
					id: user._id,
					email: user.email,
					role: "admin",
				};
				jwt.sign(
					userData,
					process.env.JWT_KEY,
					{ expiresIn: "30 days" },
					(error, token) => {
						if (error) {
							res.status(500);
							console.log(error);
							res.json({ message: "Impossible de générer le token" });
						} else {
							res.status(200);
							res.json({ token });
						}
					},
				);
			} else {
				// Password don't match
				res.status(401);
				console.log(error);
				res.json({ message: "Email ou Mot de passe incorrect" });
			}
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