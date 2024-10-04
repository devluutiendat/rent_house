// middlewares/error.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

const throwError = (status, message, res, next) => {
    const error = new Error(message);
    error.status = status;
    if (next) {
        next(error);
    } else if (res) {
        res.status(status).json({ error: message });
    }
};

module.exports = { errorHandler, throwError };
