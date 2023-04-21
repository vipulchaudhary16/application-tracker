const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET

const verifyUser = (req, res, next) => {
  //Geting user from jwt token endpoint
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }
  try {
    const data = jwt.verify(token, SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
    console.log(error)
  }
};

module.exports = verifyUser;
