"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
//This logs all interactions
module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        if (interaction.type === discord_js_1.InteractionType.ApplicationCommand) {
            switch (interaction.channel?.type) {
                case (discord_js_1.ChannelType.GuildText):
                case (discord_js_1.ChannelType.GuildNews):
                    console.log(`${interaction.createdAt}: ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction.type} called ${interaction.commandName}.`);
                    break;
                case (discord_js_1.ChannelType.GuildNewsThread):
                case (discord_js_1.ChannelType.GuildPublicThread):
                case (discord_js_1.ChannelType.GuildPrivateThread):
                    console.log(`${interaction.createdAt}: ${interaction.user.tag} in #${interaction.channel.parent?.name} in thread ${interaction.channel.name} triggered a ${interaction.type} called ${interaction.commandName}.`);
                    break;
                case (discord_js_1.ChannelType.DM):
                    console.log(`${interaction.createdAt}: ${interaction.user.tag} in DMs triggered a ${interaction.type} called ${interaction.commandName}.`);
                    break;
            }
        }
    },
};
//# sourceMappingURL=commandLogger.js.map