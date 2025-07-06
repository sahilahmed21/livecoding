const jwt = require("jsonwebtoken");

exports.generateTokens = (username) => {
    const accessToken = jwt.sign({ username }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};
