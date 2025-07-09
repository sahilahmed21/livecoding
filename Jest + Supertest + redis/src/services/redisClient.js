const redis = require('redis');
const client = redis.createClient();
client.connet().catch(console.error);
module.exports = client;