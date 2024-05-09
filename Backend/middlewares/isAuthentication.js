const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  // here jeeva is a key used in userController jwt token
  const verifytoken = jwt.verify(token, "jeeva", (err, decode) => {
    if (err) {
      return false;
    } else {
      return decode;
    }
  });
  // token verification
  if (verifytoken) {
    req.user = verifytoken.id;
    next();
  } else {
    const err = new Error("Token expired,Please login again");
    next(err);
  }
};

module.exports = isAuthenticated;
