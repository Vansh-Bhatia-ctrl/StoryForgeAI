const User = require("../models/users");
const { verifyToken } = require("../utils/jwt");

const verifyAuthentication = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized to access this route. Please login.",
      });
    }

    const decoded = verifyToken(token);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.message === "Access token has expired") {
      return res.status(401).json({
        success: false,
        message: "Access token expired. Please refresh.",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error.message === "Invalid access token") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

module.exports = { verifyAuthentication };
