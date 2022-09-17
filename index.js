const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
})

let bot = {
    client,
    prefix: 'n.',
    owners: ['274206665241395202']
}

// create collections and functions for the various functionalities of the bot
client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)
client.loadButtons = (bot, reload) => require('./handlers/buttons')(bot, reload)

// call our functions
client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

client.login(process.env.TOKEN)

module.exports = bot