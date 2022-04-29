const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Token not found. Access denied!!');
    try {
        const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verifiedUser;
        next();
    } catch (err) {
        res.status(400).send('Unauthorized User!!');
    }
}

module.exports = authMiddleware;
