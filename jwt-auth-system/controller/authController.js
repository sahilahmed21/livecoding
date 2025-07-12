const User = require('../model/User')
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(201).json({ message: "userRegistered" });
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true })
        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
}
exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.sendStatus(401);

        const payload = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== token) return res.sendStatus(403);

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
};
exports.logout = async (req, res, next) => {
    try {
        const user = await User.findOne({ refreshToken: req.cookies.refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out" });
    } catch (err) {
        next(err);
    }
};
