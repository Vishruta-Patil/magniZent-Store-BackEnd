const jwt = require("jsonwebtoken");

const jwtToken = ({ _id }) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = jwtToken;
