import {MessageReaction} from 'discord.js';
import {Command, CommandMessage} from 'discord.js-commando';

export class SleepyCommand extends Command {
    reactSuccess(msg: CommandMessage): Promise<MessageReaction> {
        return msg.react('👍');
    }

    reactDiscordError(msg: CommandMessage): Promise<MessageReaction> {
        return msg.react('👎');
    }

    reactCommandError(msg: CommandMessage): Promise<MessageReaction> {
        return msg.react('👎');
    }
}