const RefreshTokens = require("../models/refreshToken");
const User = require("../models/users");
const {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
  generateRefreshTokenExpiry,
} = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already registered."
            : "username already taken.",
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    await RefreshTokens.create({
      token: refreshToken,
      user: user._id,
      expiresAt: generateRefreshTokenExpiry(),
      createdByIp: req.ip,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
      accessToken,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }

    console.log(
      `Error registering user: ${error}, error message:${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "User information not found, please signup." });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrect password, please try again." });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    await RefreshTokens.create({
      token: refreshToken,
      user: user._id,
      expiresAt: generateRefreshTokenExpiry(),
      createdByIp: req.ip,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User successfully logged in",
      accessToken,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(
      `Error logging in please try again: ${error}, error message: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Something went wrong please try again", error });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found. Please login again.",
      });
    }

    const storedRefreshToken = await RefreshTokens.findOne({
      token: refreshToken,
    });

    if (!storedRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token. Please login again.",
      });
    }

    if (!storedRefreshToken.isActive()) {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired or revoked. Please login again.",
      });
    }

    const newAccessToken = generateAccessToken(storedRefreshToken.user);
    const newRefreshToken = generateRefreshToken();

    storedRefreshToken.revokedAt = new Date();
    storedRefreshToken.revokedByIp = req.ip;
    storedRefreshToken.replacedByToken = newRefreshToken;
    await storedRefreshToken.save();

    await RefreshTokens.create({
      token: newRefreshToken,
      user: storedRefreshToken.user,
      expiresAt: generateRefreshTokenExpiry(),
      createdByIp: req.ip,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(
      `Refresh token error:, ${error}, error message: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Server error during token refresh",
    });
  }
};

module.exports = { signUp, login, refresh };
