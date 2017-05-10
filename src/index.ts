import SleepyBot = require('./SleepyBot');
import Settings = require('./config/local');

const bot = new SleepyBot({selfbot: Settings.discord.isSelfBot});

bot.start();