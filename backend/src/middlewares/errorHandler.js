exports.errorHandler = (err, req, res, next) => {
  // console.error("Error: ", err?.response?.data || err.message || err);
  console.error("Error: ", err.message || err);
  res.status(err.status || err?.response?.status || 500).json({
    error: err.message || "Internal Server Error",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    details: err?.response?.data || null,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
