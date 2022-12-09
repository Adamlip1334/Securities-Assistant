"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
//dependancy for discordjs
const discord_js_1 = require("discord.js");
const fs_1 = __importStar(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const deploy_commands_1 = require("./src/deploy-commands");
const devconfig_1 = require("./devconfig");
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config();
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [
        discord_js_1.Partials.Channel, // Required to receive DMs
    ],
});
/*
    The following code below takes all the events in the events folder and put it in an array and filters it by .js files
    The entire thing allows handling events to be as easy as adding it to the events folder and then restarting the bot
*/
const eventPath = node_path_1.default.join(__dirname, "src/events");
const eventFiles = fs_1.default
    .readdirSync(eventPath)
    .filter((file) => file.endsWith(".js"));
// This retrieves the event files and runs them if they should be run once or constantly ↓ this actually runs the event files code
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        exports.client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        exports.client.on(event.name, (...args) => event.execute(...args));
    }
}
exports.client.commands = new discord_js_1.Collection();
// This gets the command modules from the command folders
const cmdPath = node_path_1.default.join(__dirname, "src/commands");
const commandFiles = fs_1.default
    .readdirSync(cmdPath)
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(cmdPath, file);
    const command = require(filePath);
    exports.client.commands.set(command.data.name, command);
}
// This executes an Application commands when a player does a Application command
exports.client.on("interactionCreate", async (interaction) => {
    const command = exports.client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
        console.error(error);
    }
});
exports.client.buttons = new discord_js_1.Collection();
exports.client.modals = new discord_js_1.Collection();
exports.client.selectMenus = new discord_js_1.Collection();
const compPath = node_path_1.default.join(__dirname, "src/components");
const componentFolders = (0, fs_1.readdirSync)(compPath);
for (const folder of componentFolders) {
    const comps = node_path_1.default.join(compPath, folder);
    const componentFiles = (0, fs_1.readdirSync)(comps).filter((file) => file.endsWith(".js"));
    switch (folder) {
        case "buttons":
            for (const file of componentFiles) {
                const filePath = node_path_1.default.join(compPath, folder, file);
                const button = require(filePath);
                exports.client.buttons.set(button.data.name, button);
            }
            break;
        case "modals":
            for (const file of componentFiles) {
                const filePath = node_path_1.default.join(compPath, folder, file);
                const modal = require(filePath);
                exports.client.modals.set(modal.data.name, modal);
            }
            break;
        case "selectMenus":
            for (const file of componentFiles) {
                const filePath = node_path_1.default.join(compPath, folder, file);
                const selectmenu = require(filePath);
                exports.client.selectMenus.set(selectmenu.data.name, selectmenu);
            }
            break;
        default:
            break;
    }
}
exports.client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
        const button = exports.client.buttons.get(interaction.customId);
        try {
            await button.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while pressing this button!",
                ephemeral: true,
            });
        }
    }
    else if (interaction.isSelectMenu()) {
        const selectMenu = exports.client.selectMenus.get(interaction.customId);
        try {
            await selectMenu.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while selecting this option!",
                ephemeral: true,
            });
        }
    }
    else if (interaction.type === discord_js_1.InteractionType.ModalSubmit) {
        const modal = exports.client.modals.get(interaction.customId);
        try {
            await modal.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while submitting this modal!",
                ephemeral: true,
            });
        }
    }
});
//This is what logs the bot in
exports.client.login(process.env.TOKEN);
exports.client.on("ready", async () => {
    console.log(`The bot is up! Logged in as ${exports.client.user?.tag} at ${exports.client.readyAt}`);
    if (devconfig_1.devConfig.registerCmd === true) {
        (0, deploy_commands_1.regCMD)(exports.client.user.id);
    }
});
//# sourceMappingURL=index.js.map