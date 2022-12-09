"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: {
        name: `currentMood`,
    },
    async execute(interaction) {
        const emotion = interaction.values[0];
        try {
            const modal = new discord_js_1.ModalBuilder()
                .setTitle(`Why are you ${emotion}?`)
                .setCustomId("explainMood")
                .setComponents(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
                .setLabel(`Why are you ${emotion}?`)
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setPlaceholder(`Explain why your ${emotion}`)
                .setCustomId("explain_mood")));
            await interaction.showModal(modal);
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
//# sourceMappingURL=currentMood.js.map