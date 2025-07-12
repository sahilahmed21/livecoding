const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: duser._id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    )
}
module.exports = { generateAccessToken, generateRefreshToken };
