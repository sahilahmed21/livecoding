require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    DATABASE_FILE: process.env.DATABASE_FILE || './data/database.db',
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100')
};