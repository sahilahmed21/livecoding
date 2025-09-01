const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');
const { PORT, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require('./config');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX
}));

app.use('/', authRoutes);
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you accessed a protected resource.`, user: req.user });
});

app.get('/', (req, res) => res.json({ message: 'JWT Auth Server running' }));


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));