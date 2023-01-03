const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

exports.isAdmin = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token !== undefined) {
    jwt.verify(token, jwtKey, (error, payload) => {
      if (error) {
        console.log(error);
        res.status(403);
        res.json({ message: "Accès interdit : token invalide" });
      } else {
        if (payload.role === "admin") {
          next();
        } else {
          res.status(403);
          res.json({ message: "Accès interdit : vous n'êtes pas admin" });
        }
      }
    });
  } else {
    res.status(403);
    res.json({ message: "Accès interdit : token manquant" });
  }
};
