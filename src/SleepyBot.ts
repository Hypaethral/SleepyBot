import Discord = require('discord.js');
import Commando = require('discord.js-commando');
import Settings = require('config/local');
// import RethinkDbProvider = require('./providers/RethinkProvider');
const path = require('path');
// const sqlite = require('sqlite');
// const r = require('./db');

export = class SleepyBot extends Commando.CommandoClient {
    async start() {
        // this.setProvider(
        //     sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db))
        // ).catch(console.error);
        this.commandPrefix = Settings.discord.commandPrefix;

        this.registerLogEvents();

        if (Settings.discord.isSelfBot) {
            this.registry
                .registerGroup('self')
                .registerCommandsIn(path.join(__dirname, 'commands', 'self'));
        }

        this.login(Settings.discord.botToken);
    }

    private registerLogEvents() {
        this
            .on('error', console.error)
            .on('warn', console.warn)
            .on('debug', console.log)
            .on('ready', () => {
                console.log(`Client ready; logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`);
                console.log(`Guild list has ${this.guilds.array.length} items.`);
            })
            .on('disconnect', () => { console.warn('Disconnected!'); })
            .on('reconnecting', () => { console.warn('Reconnecting...'); })
            .on('commandError', (cmd, err) => {
                if (err instanceof Commando.FriendlyError) return;
                console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
            })
            .on('commandBlocked', (msg, reason) => {
                console.log(`Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}\nblocked; ${reason}`);
            })
            .on('commandPrefixChange', (guild, prefix) => {
                console.log(`Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}\n${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
            })
            .on('commandStatusChange', (guild, command, enabled) => {
                console.log(`Command ${command.groupID}:${command.memberName}\n${enabled ? 'enabled' : 'disabled'}\n${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
            })
            .on('groupStatusChange', (guild, group, enabled) => {
                console.log(`Group ${group.id}\n${enabled ? 'enabled' : 'disabled'}\n${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
            });
    }
};