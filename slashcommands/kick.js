const Discord = require("discord.js")

// kick slash command handler

const run = async (client, interaction) => {
    // fetch options
    let member = interaction.options.getMember('user')
    let reason = interaction.options.getString('reason') || 'No reason given'

    // verify member validity
    if (!member) {
        return interaction.reply('Invalid member')
    }

    // try to kick user
    try {
        await interaction.guild.members.kick(member, reason)
        return interaction.reply(`${member.user.tag} has been kicked for ${reason} `)
    } catch (error) {
        if (error) {
            console.error(error)
            return interaction.reply(`Failed to kick ${member.user.tag}`)
        }
    }
}

// define the parameters of the command
module.exports = {
    name: 'kick',
    description: 'Kick a member',
    perm: 'KICK_MEMBERS', // see permissions in discord api for a list of perms: https://discord.com/developers/docs/topics/permissions
    options: [
        { // who to kick
            name: 'user',
            description: 'The user to kick',
            type: Discord.ApplicationCommandOptionType.User, // see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type for all types
            required: true
        },
        { // reason for kick (optional)
            name: 'reason',
            description: 'Reason for punishment',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run
}