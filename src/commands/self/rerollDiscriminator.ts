import Commando = require('discord.js-commando');
import Settings = require('../../config/local');
export default class RerollDiscriminatorCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: 'reroll-discrim',
            aliases: ['rrd'],
            group: 'self',
            memberName: 'rerolldiscrim',
            description: 'rerolls your account\'s discriminator'
        });
    }

    async run(msg: Commando.CommandMessage, args: {}) {
        const currentUser = this.client.user;
        let newUsername = undefined;

        this.client.guilds.array().some(guild => {
            const possibleGuildMember = guild.members.array().find(member => member.user.discriminator === currentUser.discriminator && member.id !== currentUser.id);

            if (possibleGuildMember !== undefined) {
                newUsername = possibleGuildMember.user.username;
                return true;
            } else {
                return false;
            }
        });

        return currentUser.setUsername(newUsername, Settings.misc.cred)
            .then(user => {
                return msg.reply(`Rerolled discriminator successfully to ${user.discriminator}`);
            })
            .catch(err => {
                return msg.reply(`ERROR for username ${newUsername}: ${err}`);
            });
    }
}