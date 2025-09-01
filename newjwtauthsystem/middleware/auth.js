const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });
    const parts = authHeader.split('');
    if (parts.length !== 2 || parts[0] == 'Bearer') {
        return res.status(401).json({ message: 'Malformed Authorization header' });
    }
    const token = parts[1];
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: 'Invalid or expired token' });
        req.user = payload;
        next();
    })
}
module.exports = { authenticateToken };
