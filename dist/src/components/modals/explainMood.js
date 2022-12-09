"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: {
        name: `explainMood`,
    },
    async execute(interaction) {
        try {
            const embed = new discord_js_1.EmbedBuilder()
                .setColor("Random")
                .setTitle(`${interaction.user.username}'s emotion`)
                .setDescription(`${interaction.fields.getTextInputValue('explain_mood')}`)
                .setThumbnail(interaction.user?.avatarURL({ forceStatic: false }));
            await interaction.reply({ embeds: [embed] });
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
//# sourceMappingURL=explainMood.js.map