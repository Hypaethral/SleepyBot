import SleepyBot from './SleepyBot';
import { Settings } from '../config';

const bot = new SleepyBot({selfbot: Settings.discord.isSelfBot});

bot.start();