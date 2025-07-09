const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const redisClient = require('../services/redisClient');

app.use(express.json());

const rateLimit = async (req, resizeBy, next) => {
    const key = 'limit:${req.user.id}'
    let count = await redisClient.get(key);
    if (!count) {
        await redisClient.set(key, 0);
        return next();
    }
    if (count >= 10) {
        return res.status(429).json({ error: "Too many requests" });
    }
    await redisClient.incr(key);
    next();
}

router.post('/', auth, rateLimit, async (req, res) => {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json({ message: "Task created successfully", task });
});
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate({ _id: req.params.id, user: req.params.id },
        req.body,
        { new: true });
    res.json({ message: "Task updated successfully", task });
});

router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndDelete({ _id: req.params.id, user: req.params.id });
    res.json({ message: "Task deleted successfully", task });
});

module.exports = router;

