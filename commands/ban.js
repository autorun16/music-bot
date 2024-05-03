const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban seseorang',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'User yang ingin di ban',
            required: true,
        },
    ],
    execute(interaction, client) {
        const member = interaction.options.getUser('user');

        if (!member) {
            return interaction.reply('Anda perlu menyebutkan anggota yang ingin Anda ban');
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply("Saya tidak dapat ban pengguna ini.");
        }

        const userinfo = client.users.cache.getMember(member);

        return interaction.guild.members
            .ban(member)
            .then(() => {
                interaction.reply({
                    content: `${userinfo.username} Terbanned.`,
                    ephemeral: true,
                });
            })
            .catch(error =>
                interaction.reply({
                    content: `Maaf, terjadi kesalahan.`,
                    ephemeral: true,
                }),
            );
    },
};
