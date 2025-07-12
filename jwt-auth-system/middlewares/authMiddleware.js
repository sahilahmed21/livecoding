const jwt = require("jsonwebtoken");
exports.protect = (req, res, next) => {
    const authHeader = req.header.authorization;
    if (!authHeader.startsWith("Bearer")) return res.sendStatus(401);
    const token = authHeader.split("")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}