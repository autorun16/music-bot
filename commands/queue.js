const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'queue',
    description: 'Lihat antrian lagu saat ini!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        const queue = useQueue(interaction.guild.id)
        if (typeof (queue) != 'undefined') {
            const trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Sedang diputar',
                        description: trimString(`Lagu yang sedang diputar adalah 🎶 | **${queue.currentTrack.title}**! \n 🎶 | ${queue}! `, 4095),
                    }
                ]
            })
        } else {
            return void interaction.reply({
                content: 'Tidak ada lagu dalam antrian!'
            })
        }
    }
}
