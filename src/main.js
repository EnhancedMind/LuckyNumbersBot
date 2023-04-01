const { Client, Intents } = require('discord.js');

const { bot: { token }, status: { status, game } } = require('../config/config.json');
const numberHandler = require('./numberHandler');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log(`[INFO] ${client.user.username} is online and ready on ${client.guilds.cache.size} servers!`);
    client.user.setStatus(status);
    client.user.setActivity(game, { type: 'PLAYING' });
});

client.on('rateLimit', info => {
    console.log(`[WARN] Rate limit event emmited!`, info);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    numberHandler(client, message);
});

client.login(token);
