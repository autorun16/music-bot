module.exports = {
    name: 'purge',
    description: 'Hapus pesan terakhir di semua obrolan.',
    options: [
        {
            name: 'num',
            type: 4, //'INTEGER' Type
            description: 'Jumlah pesan yang ingin Anda hapus. (maks 100)',
            required: true,
        },
    ],
    async execute(interaction) {
        const deleteCount = interaction.options.get('num').value;

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return void interaction.reply({
                content: `Harap berikan angka antara 2 dan 100 untuk jumlah pesan yang akan dihapus`,
                ephemeral: true,
            });
        }

        const fetched = await interaction.channel.messages.fetch({
            limit: deleteCount,
        });

        interaction.channel
            .bulkDelete(fetched)
            .then(() => {
                interaction.reply({
                    content: `Pesan berhasil dihapus`,
                    ephemeral: true,
                });
            })
            .catch(error => {
                interaction.reply({
                    content: `Tidak dapat menghapus pesan karena: ${error}`,
                    ephemeral: true,
                });
            });
    },
};
