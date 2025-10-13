const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const authRoutes = require("./routes/auth");
const storyCard = require("./routes/storyCard");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 StoryForge AI API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    status: "OK",
    timestamp: Date.now(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  };
  res.status(200).json(healthCheck);
});

// API Routes (we'll add these next)
app.use("/api/auth", authRoutes);
app.use("/api/save-story", storyCard);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error("🔴 Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log("================================================");
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM signal received: closing HTTP server");
  mongoose.connection.close();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT signal received: closing HTTP server");
  mongoose.connection.close();
  process.exit(0);
});
