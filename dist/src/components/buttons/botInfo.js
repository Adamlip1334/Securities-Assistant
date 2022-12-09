"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../../../index");
module.exports = {
    data: {
        name: `botInfo`,
    },
    async execute(interaction) {
        try {
            const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.SelectMenuBuilder()
                .setCustomId("currentMood")
                .setPlaceholder('Choose your mood')
                .setOptions([{ label: "happy", value: "happy", emoji: "😃" }, { label: 'sad', value: 'sad', emoji: "😭" }, { label: 'mischievous', value: 'mischievous', emoji: "😈" }]));
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(`#6bde36`)
                .setTitle(`${index_1.client.user?.username}'s commands`)
                .setDescription(`${index_1.client.user.username}`)
                .setThumbnail(index_1.client.user?.avatarURL({ forceStatic: false }));
            await interaction.reply({ embeds: [embed], components: [row] });
        }
        catch (error) {
            await interaction.reply({
                content: "This server has 0 commands",
                ephemeral: true,
            });
            console.error(error);
        }
    },
};
//# sourceMappingURL=botInfo.js.map