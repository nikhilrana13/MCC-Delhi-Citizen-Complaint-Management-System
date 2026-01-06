const Response = require("../Utils/ResponseHandler");

const IsAnyAuth = (req, res, next) => {
  if (req.user && (req.role === "citizen" || req.role === "mc")) {
    return next();
  }
  return Response(res, 403, "Unauthorized");
};

module.exports = IsAnyAuth