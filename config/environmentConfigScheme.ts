export namespace Config {
    export interface EnvironmentConfigScheme {
        /**
         * Options for Discord bot
         */
        readonly discord: {
            /**
             * Token of the bot app you're using to connect to discord.
             * If self-botting, this is your own token taken from the
             * developer tools storage within Discord itself.
             */
            readonly botToken: string;

            /**
             * Prefix required for the bot to parse something as an intended command.
             */
            readonly commandPrefix: string;

            /**
             * Flag indicating whether this bot is intended to run on your own account.
             */
            readonly isSelfBot?: boolean;
        };

        /**
         * Options for Rethink database connection pool
         */
        readonly rethink?: {
            readonly host: string;
            readonly port: number;
            readonly dbPrefix: string;
            readonly user: string;
            readonly password: string;
            readonly timeout: number;
        };

        /**
         * Unrelated options
         */
        readonly misc?: {
            readonly cred?: string;
            trashpostMeme?: boolean;
            welcomeMessages?: boolean;
        };
    }
}