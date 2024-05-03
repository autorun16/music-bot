const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueryType, useMainPlayer} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'play',
    description: 'Putar lagu di Channel Anda!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'Lagu yang ingin Anda mainkan',
            required: true,
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('query');
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.followUp({content: 'Tidak ada hasil yang ditemukan!'});

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 10,
                        //defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

                await interaction.followUp({
                    content: `⏱ | Memuat lagu anda ${searchResult.playlist ? 'playlist' : 'track'}...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'Sebuah kesalahan telah terjadi!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'Terjadi kesalahan saat mencoba menjalankan perintah itu: ' + error.message,
            });
        }
    },
};
