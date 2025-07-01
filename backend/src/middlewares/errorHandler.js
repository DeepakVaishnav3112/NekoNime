exports.errorHandler = (err, req, res, next) => {
    console.error("Error: ", err?.response?.data || err.message || err);
    // console.error("Error: ", err.message);
    res.status(err?.response?.status || 500).json({
        error: err.message || "Internal Server Error",
        details: err?.response?.data || null,
    });
};