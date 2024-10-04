// middlewares/validation.js
const { throwError } = require('./error');

const validateDto = (schema) => (req, res, next) => {    
    const { error } = schema.validate(req.body, { abortEarly: false }); // Use abortEarly: false to get all validation errors
    if (error) {
        return throwError(400, error.details.map(detail => detail.message).join(', '), res); // Send a 400 Bad Request status code
    }
    next();
};

module.exports = validateDto;
