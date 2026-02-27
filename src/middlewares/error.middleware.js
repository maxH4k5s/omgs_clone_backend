const errorMiddleware = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!statusCode) {
        statusCode = 500;
        message = message || "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export { errorMiddleware };
