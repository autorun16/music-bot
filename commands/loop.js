const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueueRepeatMode, useQueue} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'loop',
    description: 'Mode ulang',
    options: [
        {
            name: 'mode',
            type: ApplicationCommandOptionType.Integer,
            description: 'Loop type',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Lagu',
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: 'Antrian',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Putar Otomatis',
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ],
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const queue = useQueue(interaction.guild.id)
            if (!queue || !queue.currentTrack) {
                return void interaction.followUp({content: '❌ | Tidak ada musik yang diputar!'});
            }

            const loopMode = interaction.options.getInteger('mode');
            queue.setRepeatMode(loopMode);
            const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

            return void interaction.followUp({
                content: `${mode} | Mode putaran yang diperbarui!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: 'Terjadi kesalahan saat mencoba menjalankan perintah: ' + error.message,
            });
        }
    },
};
