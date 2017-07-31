import * as Commando from 'discord.js-commando';

export default class RerollDiscriminatorCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: 'find-discrims',
            aliases: ['fd'],
            group: 'self',
            memberName: 'finddiscrims',
            description: 'find usernames matching your account\'s discriminator'
        });
    }

    async run(msg: Commando.CommandMessage, args: {}) {
        const currentUser = this.client.user;

        const guildsOfUsernames = this.client.guilds.array().map(guild => {
            return guild.members.array()
            .filter(member => member.user.discriminator === currentUser.discriminator && member.id !== currentUser.id)
            .map(member => `${member.user.username}#${member.user.discriminator}`);
        });

        const flattened = [].concat.apply([], (guildsOfUsernames));
        return msg.reply(`test`);
    }
}