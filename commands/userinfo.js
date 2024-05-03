const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Dapatkan informasi tentang pengguna.',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'Pengguna yang ingin Anda dapatkan infonya',
            required: true,
        },
    ],
    execute(interaction, client) {
        const user = interaction.options.getUser('user');

        interaction.reply({
            content: `Nama: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
            ephemeral: true,
        });
    },
};
