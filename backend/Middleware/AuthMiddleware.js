
const jwt = require("jsonwebtoken");
const Response = require("../Utils/ResponseHandler");

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("token",authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response(res, 401, "Unauthorized: Token missing");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.id;
    req.role = decoded.role;
    // console.log("req.user",req.role)

    next();
  } catch (error) {
    return Response(res, 401, "Unauthorized: Invalid token");
  }
};

module.exports = AuthMiddleware;
