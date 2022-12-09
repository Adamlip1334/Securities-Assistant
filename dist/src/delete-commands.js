"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCMD = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const deleteCMD = (clientId) => {
    const rest = new rest_1.REST({ version: "9" }).setToken(process.env.TOKEN);
    rest
        .put(v9_1.Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log(`Successfully deleted all application commands.`))
        .catch(console.error);
};
exports.deleteCMD = deleteCMD;
//# sourceMappingURL=delete-commands.js.map