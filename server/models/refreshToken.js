const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    createdByIP: {
      type: String,
    },
    revokedAt: {
      type: Date,
    },
    revokedByIp: {
      type: String,
    },
    replacedByToken: {
      type: String,
    },
  },
  { timestamps: true }
);

refreshTokenSchema.methods.isExpired = function () {
  return new Date() >= this.expiresAt;
};

refreshTokenSchema.methods.isActive = function () {
  return !this.revokedAt && !this.isExpired();
};

const RefreshTokens = mongoose.model("RefreshToken", refreshTokenSchema);
module.exports = RefreshTokens;
