const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded.username;
        next();
    } catch {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};
