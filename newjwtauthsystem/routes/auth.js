const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt.js');
const jwt = require('jsonwebtoken');
const { run, get } = require('../db');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config');

function validateUsernameAndPassword(username, password) {
    if (!username || typeof username !== 'string' || username.length < 3) {
        return 'Username must be at least 3 characters long.';
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
}

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const validationErr = validateUsernameAndPassword(username, password);
        if (validationErr) return res.status(400).json({ message: validationErr });


        // Check if user exists
        const existing = await get('SELECT id FROM users WHERE username = ?', [username]);
        if (existing) return res.status(409).json({ message: 'Username already taken' });
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password.salt);

        await run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
        return res.status(201).json({ message: 'User created' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });

    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Missing username or password' });


        const user = await get('SELECT id, username, password FROM users WHERE username = ?', [username]);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        // Return token (client should store securely — recommended HttpOnly cookie in real apps)
        return res.json({ token, expiresIn: JWT_EXPIRES_IN });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;