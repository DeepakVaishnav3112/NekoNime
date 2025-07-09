exports.errorHandler = (err, req, res, next) => {
  console.error("💥 Global Error Handler Triggered 💥");
  console.error("🔗 Path:", req.originalUrl);
  console.error("🔨 Method:", req.method);
  console.error("🕒 Time:", new Date().toISOString());
  console.error("❌ Error Message:", err.message);
  if (err.stack) console.error("🧠 Stack Trace:", err.stack);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    details: err?.details || null,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
