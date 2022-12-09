"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("shows a list of commands for the bot"),
    async execute(interaction) {
        try {
            let commandsList;
            const client = interaction.client;
            const cmd = await client.application?.commands.fetch();
            commandsList = cmd
                ?.map((cmd) => `**/${cmd.name}** - ${cmd.description}`)
                .join("\n");
            const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("botInfo")
                .setEmoji("🤖")
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setLabel("Bot Info"));
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(`#6bde36`)
                .setTitle(`${client.user?.username}'s commands`)
                .setDescription(`${commandsList}`)
                .setThumbnail(client.user?.avatarURL({ forceStatic: false }));
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
//# sourceMappingURL=help.js.map