import * as Commando from 'discord.js-commando';
import * as Discord from 'discord.js';
import { SleepyCommand } from '../../models/SleepyCommand';
import { Statuses } from '../../models/Statuses';

interface SetStatusCommandArgs {
    status?: string;
}

export default class SetStatusCommand extends SleepyCommand {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: 'set-status',
            aliases: ['ss', 'go'],
            group: 'self',
            memberName: 'setstatus',
            description: 'Set your account status.',
            examples: ['setstatus online', 'ss dnd', 'go offline'],
            format: '<status>',
            args: [
                {
                    key: 'status',
                    validate: () => true,
                    parse: (val) => val,
                    prompt: 'Which status do you want?\n'
                }
            ]
        });
    }

    getDiscordStatusFromSetStatusArg(arg: SetStatusCommandArgs): string | undefined {
        if (arg.status === undefined) {
            return undefined;
        }

        const argStatus = arg.status.toLowerCase();

        for (const statusType in Statuses) {
            if (Statuses[statusType].some(status => status === argStatus)) {
                return statusType.toLowerCase();
            }
        }

        return undefined;
    }

    async run(msg: Commando.CommandMessage, args: SetStatusCommandArgs) {
        const requestedStatus = this.getDiscordStatusFromSetStatusArg(args);

        if (requestedStatus !== undefined) {
            return this.client.user.setStatus(<Discord.PresenceStatus>requestedStatus)
            .then(user => {
                this.reactSuccess(msg);
                return;
            })
            .catch(err => {
                this.reactDiscordError(msg);
                return;
            });
        }

        this.reactCommandError(msg);
        return;
    }
}