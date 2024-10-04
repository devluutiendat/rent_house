const { throwError } = require("./error");
const jwt = require("jsonwebtoken"); // Ensure jwt is imported

const verifyToken = (req, res, next) => {    
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return throwError(401, "No token", res, next);
    }
    const rawToken = req.headers.authorization.split(' ')[1];
    jwt.verify(rawToken, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
            return throwError(401, "Token invalid", res, next);
        }
        req.user = decode;
        next();
    });
};

module.exports ={ verifyToken}
