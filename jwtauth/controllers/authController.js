const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateTokens");

// let users = []; // Mock DB
// let refreshTokens = [];
const User = require("../models/User");

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed });

    res.json({ msg: "User registered" });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user.username);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await User.findOne({ username: decoded.username });

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ msg: "Invalid refresh token" });
        }

        const { accessToken, refreshToken } = generateTokens(user.username);
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch {
        res.status(403).json({ msg: "Token invalid" });
    }
};

exports.privateRoute = (req, res) => {
    res.json({ msg: `Welcome ${req.user}` });
};
